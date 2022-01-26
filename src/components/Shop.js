import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";
import calculatePriceOf from './Price';
import Categories from './Categories';

export default function Shop () {

 useEffect(() => {
  console.log("mounted");
  fetchItems();
  return () => {
    console.log("unmounted");
    setItems([]);
  } 
 }, []);
 
 const [duplicate, setDuplicate] = useState([]);
 const [error, setError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const [fetched, setFetched] = useState(false);
 const [items, setItems] = useState([]);
 
 const fetchItems = async () => {
  try {
    const data = await fetch("https://fakestoreapi.com/products");
    const items = await data.json();
    setFetched(true);
    setDuplicate(items);
    setItems(items);
    setError('');
  } catch (err) {
    setFetched(true);
    setError(err);
    setErrorMessage(`Sorry! You have an error: ${err}`);
  }
 };

 useEffect(() => {
  if (error == '') setErrorMessage('');
 });

 const [refresh, setRefresh] = useState(false);
 const [selected, setSelected] = useState("All");

 const changeCategory = () => {
  setItems(duplicate);
  let selectBox = document.getElementById("selectBox");
  let selectedValue = selectBox.options[selectBox.selectedIndex].value;
  setSelected(selectedValue);
 }

 useEffect(() => {
   const mensClothing = items.slice(0, 4);
   const jewelry = items.slice(4, 8);
   const electronics = items.slice(8, 14);
   const womensClothing = items.slice(14, 20);
   if (selected == "Men's Clothing") setItems(mensClothing);
   if (selected == "Jewelry") setItems(jewelry);
   if (selected == "Electronics") setItems(electronics);
   if (selected == "Women's Clothing") setItems(womensClothing);
 }, [selected]);

 useEffect(() => {
   setRefresh(!refresh);
 }, [items]);

 return (
  <div>
   <NavBar/>
   <br/>
   {errorMessage && <h1>{errorMessage}</h1>}
   {!fetched && <h1>Loading...</h1>}
   <br/>
   <br/>
   {fetched && !errorMessage && <h1>Buy:</h1>}
   <br/>
   {fetched && !errorMessage && <Categories onChange={changeCategory}/>}
   <br/>
   <br/>
   {items.map(item => { 
    let itemPrice = calculatePriceOf(item); 
    return (<div key={item.id}>
     <h4>{item.title}</h4> 
     <Link to={`/shop/${item.id}`}><img src={item.image} alt={item.title} height="150px" width="150px"/></Link>
     <br/>
     <br/>
     <br/>
     <p><label>Price: </label>${itemPrice}</p>
   </div>)}
   )}
  </div>
 );
}