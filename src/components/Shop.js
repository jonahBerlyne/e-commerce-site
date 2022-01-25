import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import store from "../store";

export default function Shop() {

 useEffect(() => {
  fetchItems();
 }, []);

 // const [refresh, setRefresh] = useState(false);

 // useEffect(() => {
 //   setRefresh(!refresh);
 // }, [items]);

 function getState() {
  const state = store.getState();
  console.log("state is " + state + " and the shop length is " + state.length);
 }

 const [items, setItems] = useState([]);

 const fetchItems = async () => {
  const data = await fetch("https://www.easports.com/fifa/ultimate-team/api/fut/item", {method: 'get', mode: 'no-cors'});
  console.log(data);
  const dataItems = await data.json();
  setItems(dataItems);
 };

  return (
    <div className="App">
      <NavBar/>
      <h1>Shop Page</h1>
      <button onClick={getState}>Get State</button>
      <h2>Items:</h2>
      {/* {items.map(item => {
       return (
        <div key={item.id}>
         <h3>{item.title}</h3>
        </div>
       )}
      )} */}
    </div>
  );
}