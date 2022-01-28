import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import store from "../store";
import { itemDecreased, itemIncreased, itemRemoved } from "../Actions";

export default function Cart() {

  const state = store.getState();
  let arr = [];
  if (state.length !== 0) {
    for (let i = 0; i < state.length; i++) {
      arr.push(state[i].price);
    }
  }
  let total = 0;
  if (arr.length !== 0) {
    total = parseFloat(arr.reduce((a, b) => a + b).toFixed(2));
  }


//  function getState() {

//   const state = store.getState();
//   console.log("state is " + state + " and the cart length is " + state.length);
//  }

  const [refresh, setRefresh] = useState(false);

  const decrementQty = (id, price, quantity) => {
    store.dispatch(itemDecreased(id, price));
    console.log("decreased!");
    console.log(store.getState());
    if (quantity - 1 === 0) removeItem(id);
    setRefresh(!refresh);
  }

  const incrementQty = (id, price) => {
   store.dispatch(itemIncreased(id, price));
   console.log("increased!");
   console.log(store.getState());
   setRefresh(!refresh);
  }

  const removeItem = id => {
    console.log("clicked");
    store.dispatch(itemRemoved(id));
    setRefresh(!refresh);
  }
  return (
    <div className="App">
      <NavBar/>
      <h1>Cart Page</h1>
      {state.map(item => {
        return (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.image} height="100px" width="100px"/>
            <br/>
            <br/>
            {/* <input type="number" min="1" value={item.quantity}></input> */}
            <div style={{display: "flex", gap: "5px"}}>
              <button onClick={() => decrementQty(item.id, item.price, item.quantity)}>-</button>
              <h4>{item.quantity}</h4>
              <button onClick={() => incrementQty(item.id, item.price)}>+</button>
            </div>
            <h4>Price: ${parseFloat(item.price.toFixed(2))}</h4>
            <button onClick={() => removeItem(item.id)}>Remove Item</button>
          </div>
        );
      })}
      <h2>Total Price: ${total}</h2>
      {/* <button onClick={getState}>Get State</button> */}
    </div>
  );
}