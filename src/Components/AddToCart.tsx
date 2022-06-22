import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { setDoc, doc, getDoc } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import itemData from '../Data/ItemData';
import { openCart } from '../Redux/Slices/cartSlice';
import { useAppDispatch } from '../Redux/Hooks';
import "../Styles/Shop.css";
import { getAuth } from 'firebase/auth';
import { store } from '../Redux/Store';

export default function AddToCart({ id }: { id: any }) {
 
 const [item, setItem] = useState<any>([]);

 useEffect(() => {
   const _item = itemData[id - 1];
   setItem(_item);
 }, []);

 const dispatch = useAppDispatch();

 const addToCart = async (): Promise<any> => {
   try {
     const docRef = doc(fireDB, "users", `${getAuth().currentUser?.uid}`, "items", `${item.id}`);
     const docSnap = await getDoc(docRef);
     let itemDoc = {};
     if (docSnap?.exists()) {
      itemDoc = {
        ...docSnap.data(),
        "quantity": docSnap.data().quantity + 1,
        "total": docSnap.data().total + item.price
      };
     } else {
       itemDoc = {
         "id": item.id,
         "image": item.image,
         "price": item.price,
         "quantity": 1,
         "title": item.title,
         "total": item.price
       };
     }
     await setDoc(docRef, itemDoc);
     dispatch(openCart());
   } catch (err) {
     alert(`Item logging error: ${err}`);
   }
 }

 return (
  <>
    <button data-testid={`addItem${id}ToCart`} className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
  </>
 );
}