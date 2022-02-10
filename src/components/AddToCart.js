import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import store from '../Redux/Store';
import { itemAdded } from '../Redux/Actions';
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import fireDB from '../firebaseConfig';

export default function AddToCart( {initialPrice} ) {

 const { id } = useParams();
 
 const [item, setItem] = useState([]);
 const [error, setError] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const {user} = JSON.parse(localStorage.getItem("currentUser"));

 
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
   fetchItem();
 }, []);

 useEffect(() => {
  if (error == '') setErrorMessage('');
 });

 const [added, setAdded] = useState(false);

 const [addedMsg, setAddedMsg] = useState(false);

 useEffect(() => {
   let itemState = store.getState();
   itemState = itemState.filter(i => i.id === item.id );
   if (added) logItemToDB(itemState);
 }, [added]);

 const logItemToDB = async state => {
   try {
     let itemDoc = state[0];
     const docRef = doc(fireDB, "users", `${user.uid}`, "items", `${item.title}`);
     await setDoc(docRef, itemDoc);
     alert("Item logged");
     setAdded(false);
   } catch (err) {
     alert(`Item logging error: ${err}`);
     setAdded(false);
   }
 }

 const addToCart = () => {
   store.dispatch(itemAdded(item.id, item.title, item.image, initialPrice));
   setAdded(true);
   setAddedMsg(true);
   setTimeout(() => {
     setAddedMsg(false);
   }, 500);
 }

 return (
  <div>
   {errorMessage && <h1>{errorMessage}</h1>}
   <div style={{display: "flex", gap: "100px"}}>
    <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
   </div> 
   <br/>
   {addedMsg && <p>Added!</p>}
   <br/>
   <br/>
  </div>
 );
}