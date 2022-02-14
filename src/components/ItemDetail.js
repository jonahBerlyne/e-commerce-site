import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { useParams } from 'react-router';
import calculatePriceOf from './Price';
import AddToCart from './AddToCart';

export default function ItemDetail () {

 const { id } = useParams();

 useEffect(() => {
  fetchItem();
  return () => {
    setItem([]);
  } 
 }, []);

 const [item, setItem] = useState([]);
 const [error, setError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const [fetched, setFetched] = useState(false);

 const fetchItem = async () => {
  try {
   const itemData = await fetch(`https://fakestoreapi.com/products/${id}`);
   const item = await itemData.json();
   setFetched(true);
   setItem(item);
   setError('');
  } catch (err) {
    setFetched(true);
    setError(err);
    setErrorMessage(`Sorry! You have an error: ${err}`);
  }
 }

 useEffect(() => {
  if (error == '') setErrorMessage('');
 });

 let initialPrice = calculatePriceOf(item);

 return (
  <div>
   <NavBar/>
   <br/>
   {errorMessage && <h1>{errorMessage}</h1>}
   {!fetched && <h1>Loading...</h1>}
   <h2>{item.title}</h2>
   {fetched && !errorMessage && <img src={item.image} alt={item.title} height="400px" width="400px"/>} 
   <br/>
   <br/>
   <br/>
   {fetched && !errorMessage && <h3>{item.description}.</h3>}
   <br/>
   <br/>
   <br/>
   {fetched && !errorMessage && <h3><label>Price: </label>${initialPrice}</h3>}
   <br/>
   {fetched && !errorMessage && <AddToCart initialPrice={initialPrice}/>}
  </div>
 );
}