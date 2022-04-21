import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import store from '../Redux/Store';
import { itemAdded, itemSet } from '../Redux/Actions';
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import fireDB from '../firebaseConfig';
import itemData from '../Data/ItemData';
import { useDispatch } from 'react-redux';

export default function AddToCart() {

 const { id } = useParams();
 const dispatch = useDispatch();
 
 const [item, setItem] = useState([]);
 const { user } = JSON.parse(localStorage.getItem("currentUser"));

 useEffect(() => {
   setItem(itemData[id - 1]);
   const cart = JSON.parse(localStorage.getItem("cart"));
   if (!cart) return;
   cart.forEach(item => {
    dispatch(itemSet(item.id, item.title, item.image, item.price, item.quantity));
   });
   console.log(store.getState());
 }, []);

 const [added, setAdded] = useState(false);

 const [addedMsg, setAddedMsg] = useState(false);

 useEffect(() => {
   const state = store.getState();
   const itemState = state.filter(i => i.id === item.id );
   if (added) {
     setAdded(false);
     localStorage.setItem("cart", JSON.stringify(state));
     logItemToDB(itemState);
   }
 }, [added]);

 const logItemToDB = async state => {
   try {
     let itemDoc = state[0];
     const docRef = doc(fireDB, "users", `${user.uid}`, "items", `${item.title}`);
     await setDoc(docRef, itemDoc);
     alert("Item logged");
   } catch (err) {
     alert(`Item logging error: ${err}`);
   }
 }

 const addToCart = () => {
   dispatch(itemAdded(item.id, item.title, item.image, item.price));
   setAdded(true);
   setAddedMsg(true);
   setTimeout(() => {
     setAddedMsg(false);
   }, 500);
 }

 return (
  <div>
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