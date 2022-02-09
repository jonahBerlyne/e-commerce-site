import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import store from '../Redux/Store';
import { itemDecreased, itemIncreased, itemRemoved } from "../Redux/Actions";
import { FaTrash } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';

export default function Cart() {

  const [state, setState] = useState(store.getState());
  const [total, setTotal] = useState(0);

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

  const decrementQty = (id, price, quantity) => {
    store.dispatch(itemDecreased(id, price));
    console.log("decreased!");
    console.log(store.getState());
    setState(store.getState());
    if (quantity - 1 === 0) removeItem(id);
    setRefresh(!refresh);
  }

  const incrementQty = (id, price) => {
   store.dispatch(itemIncreased(id, price));
   console.log("increased!");
   console.log(store.getState());
   setState(store.getState());
   setRefresh(!refresh);
  }

  const removeItem = id => {
    store.dispatch(itemRemoved(id));
    console.log("removed");
    setState(store.getState());
    setRefresh(!refresh);
  }

  return (
    <div className="App">
      <NavBar/>
      <h1>Cart Page</h1>
      {total === 0 && <h2>Your cart is empty.</h2>}
      {state.map(item => {
        return (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.image} height="100px" width="100px"/>
            <br/>
            <br/>
            <div style={{display: "flex", gap: "5px"}}>
              <button className='btn btn-outline-secondary' onClick={() => decrementQty(item.id, item.price, item.quantity)}>-</button>
              <h4>{item.quantity}</h4>
              <button className='btn btn-outline-secondary' onClick={() => incrementQty(item.id, item.price)}>+</button>
            </div>
            <h4>Price: ${parseFloat(item.price).toFixed(2)}</h4>
            <button style={{border: "none", backgroundColor: "#fff"}} onClick={() => removeItem(item.id)}>
              <IconContext.Provider value={{ color: "red" }}>
                <FaTrash/>
              </IconContext.Provider>
            </button>
          </div>
        );
      })}
      {total !== 0 && <h2>Total Price: ${total}</h2>}
    </div>
  );
}