import React, { useState, useEffect } from 'react';
import store from '../Redux/Store';
import { decreaseItemInCart, increaseItemInCart, removeItemFromCart, setItemToCart } from "../Redux/Cart/CartActions";
import { FaTrash } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';
import { setDoc, deleteDoc, doc } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import "../Styles/Cart.css";
import { selectCart } from '../Redux/Slices/cartSlice';

export default function CartPage() {

  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const [state, setState] = useState<any[]>([]);
  const [total, setTotal] = useState<number | string>(0);
  const [itemTitle, setItemTitle] = useState<string>('');
  const [itemId, setItemId] = useState<number>(NaN);

  useEffect(() => {
    const cartJSON = JSON.parse(localStorage.getItem("cart") || "{}");
    cartJSON.forEach((item: any) => {
      dispatch(setItemToCart(item.id, item.title, item.image, item.price, item.quantity));
    });
    setState(cart);
  }, []);

  useEffect(() => {
    let priceArr: any[] = [];
    if (state.length !== 0) {
      for (let i = 0; i < state.length; i++) {
        priceArr.push(state[i].price);
      }
    }
    calculateTotal(priceArr);
  }, [state]);
  
  const calculateTotal = (prices: any[]): void => {
    if (prices.length !== 0) {
      setTotal(parseFloat(prices.reduce((a, b) => a + b)).toFixed(2));
    } else {
      setTotal(0);
    }
    setRefresh(!refresh);
  }

  const [refresh, setRefresh] = useState<boolean>(false);
  const [adjusted, setAdjusted] = useState<boolean>(false);

  const decrementQty = (title: string, id: number, price: number, quantity: number): void => {
    dispatch(decreaseItemInCart(id, price));
    setState(cart);
    if (quantity - 1 === 0) {
      removeItem(title, id);
    } else {
      setItemId(id);
      setItemTitle(title);
      setAdjusted(true);
    }
    setRefresh(!refresh);
  }

  const incrementQty = (title: string, id: number, price: number): void => {
    dispatch(increaseItemInCart(id, price));
    setState(cart);
    setItemId(id);
    setItemTitle(title);
    setAdjusted(true);
    setRefresh(!refresh);
  }

  const [removed, setRemoved] = useState<boolean>(false);

  const removeItem = (title: string, id: number): void => {
    dispatch(removeItemFromCart(id));
    setState(cart);
    setItemId(id);
    setItemTitle(title);
    setRemoved(true);
    setRefresh(!refresh);
  }

  useEffect(() => {
    let state = cart.filter(i => i.id === itemId);
    if (adjusted || removed) {
      localStorage.setItem("cart", JSON.stringify(cart));
      handleItemFromDB(state);
    }
  }, [adjusted, removed]);

  const handleItemFromDB = async (state: any): Promise<any> => {
    try {
      const docRef = doc(fireDB, "users", `${auth.currentUser?.uid}`, "items", `${itemTitle}`);
      if (adjusted) {
        const itemDoc = state[0];
        await setDoc(docRef, itemDoc);
        setAdjusted(false);
        alert("Item logged");
      }
      if (removed) {
        await deleteDoc(docRef);
        setRemoved(false);
        alert("Item deleted");
      }
    } catch (err) {
      alert(`Item handling error: ${err}`);
      setAdjusted(false);
    }
  }

  const goToCheckout = (): void => {
    const checkoutTotal: string = `${total}`;
    localStorage.setItem("checkout", checkoutTotal);
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