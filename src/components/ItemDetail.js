import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useParams } from 'react-router';
import AddToCart from './AddToCart';
import itemData from '../Data/ItemData';

export default function ItemDetail () {

 const { id } = useParams();
 const [item, setItem] = useState([]);
 
 useEffect(() => {
  setItem(itemData[id - 1]);
  return () => {
    setItem([]);
  } 
 }, []);


 return (
  <div>
   <NavBar/>
   <br/>
   <h2>{item.title}</h2>
   <img src={item.image} alt={item.title} height="400px" width="400px"/>
   <br/>
   <br/>
   <br/>
   <h3>{item.description}</h3>
   <br/>
   <br/>
   <br/>
   <h3><label>Price:</label> ${item.price}</h3>
   <br/>
   <AddToCart />
  </div>
 );
}