import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import store from '../Redux/Store';
import { itemAdded } from '../Redux/Actions';

export default function AddToCart( {initialPrice} ) {

 const { id } = useParams();
 
 const [item, setItem] = useState([]);
 const [error, setError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 
 const fetchItem = async () => {
  try {
   const itemData = await fetch(`https://fakestoreapi.com/products/${id}`);
   const item = await itemData.json();
   console.log(item.image);
   setItem(item);
   setError('');
  } catch (err) {
    setError(err);
    setErrorMessage(`Sorry! You have an error: ${err}`);
  }
 }

 useEffect(() => {
   fetchItem();
 }, []);

 useEffect(() => {
  if (error == '') setErrorMessage('');
 });

 const [added, setAdded] = useState(false);

 const addToCart = () => {
   store.dispatch(itemAdded(item.id, item.title, item.image, initialPrice));
   console.log("added!");
   console.log(store.getState());
   setAdded(true);
   setTimeout(() => {
     setAdded(false);
   }, 500);
 }

 return (
  <div>
   {errorMessage && <h1>{errorMessage}</h1>}
   <div style={{display: "flex", gap: "100px"}}>
    <button onClick={addToCart}>Add to Cart</button>
   </div> 
   <br/>
   {added && <p>Added!</p>}
   <br/>
   <br/>
  </div>
 );
}