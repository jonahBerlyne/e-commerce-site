import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function AddToCart( {initialPrice} ) {

 const { id } = useParams();
 
 const [item, setItem] = useState([]);
 const [error, setError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 
 const fetchItem = async () => {
  try {
   const itemData = await fetch(`https://fakestoreapi.com/products/${id}`);
   const item = await itemData.json();
   setItem(item);
   setError('');
  } catch (err) {
    setError(err);
    setErrorMessage(`Sorry! You have an error: ${err}`);
  }
 }

 useEffect(() => {
  if (error == '') setErrorMessage('');
 });

 const [numItems, setNumItems] = useState(0);
 const addToCart = () => setNumItems(numItems + 1);

 return (
  <div>
   {errorMessage && <h1>{errorMessage}</h1>}
   <div style={{display: "flex", gap: "100px"}}>
    <button onClick={addToCart}>Add to Cart</button>
   </div> 
   <br/>
   {/* {added && <p>Added!</p>} */}
   <br/>
   <br/>
  </div>
 );
}