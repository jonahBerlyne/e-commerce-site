import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import itemData from '../Data/ItemData';

export default function Shop() {

 useEffect(() => {
  setItems(itemData);
  return () => {
    console.log("unmounted");
    setItems([]);
  } 
 }, []);

 const [items, setItems] = useState<any[]>([]);
 const [refresh, setRefresh] = useState<boolean>(false);
 const [selected, setSelected] = useState<any>("All");

 const changeCategory = (): void => {
  setItems(itemData);
  const selectBox = document.getElementById("selectBox") as HTMLSelectElement;
  const selectedValue: any = selectBox.options[selectBox.selectedIndex].value;
  setSelected(selectedValue);
 }

 useEffect(() => {
   const books = items.filter(item => item.category === "Books");
   const clothing = items.filter(item => item.category === "Clothing");
   const collection = items.filter(item => item.category === "Collection");
   const food = items.filter(item => item.category === "Food");
   const miscellaneous = items.filter(item => item.category === "Miscellaneous");
   const trinkets = items.filter(item => item.category === "Trinkets");
   if (selected === "Books") setItems(books);
   if (selected === "Clothing") setItems(clothing);
   if (selected === "Collection") setItems(collection);
   if (selected === "Food") setItems(food);
   if (selected === "Miscellaneous") setItems(miscellaneous);
   if (selected === "Trinkets") setItems(trinkets);
 }, [selected]);

 useEffect(() => {
   setRefresh(!refresh);
 }, [items]);

 return (
  <div>
   <h1>Buy:</h1>
   <br/>
   <Categories changeCategory={changeCategory}/>
   <br/>
   <br/>
   {items.map(item => { 
    return (<div key={item.id}>
     <h4>{item.title}</h4> 
     <Link to={`/shop/${item.id}`}><img src={item.image} alt={item.title} height="150px" width="150px"/></Link>
     <br/>
     <br/>
     <br/>
     <p><label>Price:</label> ${item.price}</p>
   </div>)}
   )}
  </div>
 );
}