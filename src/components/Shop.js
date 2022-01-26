import React, { useState, useEffect } from 'react';
import NavBar from "./NavBar";
import store from "../store";
import uniqid from "uniqid";

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
  const data = await fetch("https://fortnite-api.com/v2/shop/br/combined");
  // console.log(data);
  const dataItems = await data.json();
  console.log(dataItems);
  // const arr = [dataItems.data.featured.entries[0], dataItems.data.featured.entries[1], dataItems.data.featured.entries[2], dataItems.data.featured.entries[3]];
  const arr = [];
  for (let i = 0; i < 4; i++) {
   let itemLength = dataItems.data.featured.entries[i].items.length;
   for (let j = 0; j < itemLength; j++) {
    arr.push(dataItems.data.featured.entries[i].items[j]);
   }
  }
  console.log(arr);
  setItems(arr);
 };

 useEffect(() => {console.log(items)}, [items]);

  return (
    <div className="App">
      <NavBar/>
      <h1>Shop Page</h1>
      <button onClick={getState}>Get State</button>
      <h2>Items:</h2>
      {items.sort((a, b) => {
       if (a.name < b.name) return -1;
       if (a.name > b.name) return 1;
      }).map(item => {
       return (
        <div key={item.id}>
         <h1>{item.name}</h1>
         <img src={item.images.smallIcon} alt={item.name} height="150px" width="150px"/>
        </div>
       )
      })}
    </div>
  );
}