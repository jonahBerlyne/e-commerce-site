import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { setDoc, doc, getDoc } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import itemData from '../Data/ItemData';

export default function AddToCart() {

 const { id }: any = useParams();
 
 const [item, setItem] = useState<any>([]);

 useEffect(() => {
   const _item = itemData[id - 1];
   setItem(_item);
 }, []);

 const [addedMsg, setAddedMsg] = useState<boolean>(false);

 const addToCart = async (): Promise<any> => {
   try {
     const docRef = doc(fireDB, "users", `${auth.currentUser?.uid}`, "items", `${item.id}`);
     const docSnap = await getDoc(docRef);
     let itemDoc = {};
     if (docSnap.exists()) {
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
     setAddedMsg(true);
     setTimeout(() => {
       setAddedMsg(false);
     }, 500);
   } catch (err) {
     alert(`Item logging error: ${err}`);
   }
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