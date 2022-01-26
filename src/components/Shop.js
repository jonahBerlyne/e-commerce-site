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
  console.log(dataItems.data.featured.entries[0], dataItems.data.featured.entries[1], dataItems.data.featured.entries[2], dataItems.data.featured.entries[3]);
  const arr = [dataItems.data.featured.entries[0], dataItems.data.featured.entries[1], dataItems.data.featured.entries[2], dataItems.data.featured.entries[3]];
  setItems(arr);
 };

 useEffect(() => {console.log(items)}, [items]);

  return (
    <div className="App">
      <NavBar/>
      <h1>Shop Page</h1>
      <button onClick={getState}>Get State</button>
      <h2>Items:</h2>
      {/* {items.map(item => {
       return (
        <div key={uniqid()}>
         <h1>{item.section.name}</h1>
        </div>
       )
      })} */}
      {items.map(item => 
      item.items
      // .sort((a, b) => {
      //  console.log(a);
      //  console.log(b);
      //  if (a.name < b.name) return -1;
      //  if (a.name > b.name) return 1;
      // })
      .map(i => {
        return (
         <div key={i.id}>
          <h1>{i.name}</h1>
          <img src={i.images.smallIcon} alt={i.name} height="150px" width="150px"/>
         </div>
        )
       })
      )}
    </div>
  );
}