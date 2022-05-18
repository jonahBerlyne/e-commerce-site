import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { addItemToCart, setItemToCart } from '../Redux/Cart/CartActions';
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import itemData from '../Data/ItemData';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import store from '../Redux/Store';
import { selectCart } from '../Redux/Slices/cartSlice';

export default function AddToCart() {

 const { id }: any = useParams();

 const cart = useAppSelector(selectCart);
 const dispatch = useAppDispatch();
 
 const [item, setItem] = useState<any>([]);

 useEffect(() => {
   const itemNeeded = itemData[id - 1];
   setItem(itemNeeded);
   const cartJSON = JSON.parse(localStorage.getItem("cart") || "{}");
   if (!cartJSON) return;
   cartJSON.forEach((item: any) => {
    dispatch(setItemToCart(item.id, item.title, item.image, item.price, item.quantity));
   });
 }, []);

 const [added, setAdded] = useState<boolean>(false);

 const [addedMsg, setAddedMsg] = useState<boolean>(false);

 useEffect(() => {
   const state = cart.filter((i: any) => i.id === item.id );
   if (added) {
     setAdded(false);
     localStorage.setItem("cart", JSON.stringify(cart));
     logItemToDB(state);
   }
 }, [added]);

 const logItemToDB = async (state: any): Promise<any> => {
   try {
     let itemDoc = state[0];
     const docRef = doc(fireDB, "users", `${auth.currentUser?.uid}`, "items", `${item.title}`);
     await setDoc(docRef, itemDoc);
     alert("Item logged");
   } catch (err) {
     alert(`Item logging error: ${err}`);
   }
 }

 const addToCart = (): void => {
   dispatch(addItemToCart(item.id, item.title, item.image, item.price));
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