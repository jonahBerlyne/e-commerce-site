import React, { useState, useEffect } from 'react';
import store from '../Redux/Store';
import { itemDecreased, itemIncreased, itemRemoved, itemSet } from "../Redux/Actions";
import { FaTrash } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';
import { setDoc, deleteDoc, doc } from "firebase/firestore";
import fireDB from '../firebaseConfig';

export default function Cart() {

  const [state, setState] = useState([]);
  const [total, setTotal] = useState(0);
  const {user} = JSON.parse(localStorage.getItem("currentUser"));
  const [itemTitle, setItemTitle] = useState('');
  const [itemId, setItemId] = useState('');

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
    cart.forEach(item => {
      store.dispatch(itemSet(item.id, item.title, item.image, item.price, item.quantity));
    });
    setState(store.getState());
  }, []);

  useEffect(() => {
    let priceArr = [];
    if (state.length !== 0) {
      for (let i = 0; i < state.length; i++) {
        priceArr.push(state[i].price);
      }
    }
    calculateTotal(priceArr);
  }, [state]);
  
  const calculateTotal = prices => {
    if (prices.length !== 0) {
      setTotal(parseFloat(prices.reduce((a, b) => a + b)).toFixed(2));
    } else {
      setTotal(0);
    }
    setRefresh(!refresh);
  }

  const [refresh, setRefresh] = useState(false);
  const [adjusted, setAdjusted] = useState(false);

  const decrementQty = (title, id, price, quantity) => {
    store.dispatch(itemDecreased(id, price));
    setState(store.getState());
    if (quantity - 1 === 0) {
      removeItem(title, id);
    } else {
      setItemId(id);
      setItemTitle(title);
      setAdjusted(true);
    }
    setRefresh(!refresh);
  }

  const incrementQty = (title, id, price) => {
    store.dispatch(itemIncreased(id, price));
    setState(store.getState());
    setItemId(id);
    setItemTitle(title);
    setAdjusted(true);
    setRefresh(!refresh);
  }

  const [removed, setRemoved] = useState(false);

  const removeItem = (title, id) => {
    store.dispatch(itemRemoved(id));
    setState(store.getState());
    setItemId(id);
    setItemTitle(title);
    setRemoved(true);
    setRefresh(!refresh);
  }

  useEffect(() => {
    let itemState = state.filter(i => i.id === itemId);
    if (adjusted || removed) {
      localStorage.setItem("cart", JSON.stringify(state));
      handleItemFromDB(itemState);
    }
  }, [adjusted, removed]);

  const handleItemFromDB = async state => {
    try {
      const itemDoc = state[0];
      const docRef = doc(fireDB, "users", `${user.uid}`, "items", `${itemTitle}`);
      if (adjusted) {
        await setDoc(docRef, itemDoc);
        setAdjusted(false);
        alert("Item logged");
      }
      if (removed) {
        await deleteDoc(docRef, itemDoc);
        setRemoved(false);
        alert("Item deleted");
      }
    } catch (err) {
      alert(`Item handling error: ${err}`);
      setAdjusted(false);
    }
  }

  const goToCheckout = () => {
    localStorage.setItem("checkout", true);
    window.location.href = "/checkout";
  }

  return (
    <div className="App">
      <h1>Cart Page</h1>
      {total === 0 && <h2>Your cart is empty.</h2>}
      {state.map(item => {
        return (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.title} height="100px" width="100px"/>
            <br/>
            <br/>
            <div style={{display: "flex", gap: "5px"}}>
              <button className='btn btn-outline-secondary' onClick={() => decrementQty(item.title, item.id, item.price, item.quantity)}>-</button>
              <h4>{item.quantity}</h4>
              <button className='btn btn-outline-secondary' onClick={() => incrementQty(item.title, item.id, item.price)}>+</button>
            </div>
            <h4>Price: ${parseFloat(item.price).toFixed(2)}</h4>
            <button style={{border: "none", backgroundColor: "#fff"}} onClick={() => removeItem(item.title, item.id)}>
              <IconContext.Provider value={{ color: "red" }}>
                <FaTrash/>
              </IconContext.Provider>
            </button>
          </div>
        );
      })}
      {total !== 0 && 
        <div>
          <h2>Total Price: ${total}</h2>
          <button onClick={goToCheckout}>Checkout</button>
        </div>
      }
    </div>
  );
}