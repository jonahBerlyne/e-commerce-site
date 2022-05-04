import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import NavBar from '../Components/NavBar';
import Audio from '../Components/Audio';
import fireDB from '../firebaseConfig';
import { collection, query, getDocs } from "firebase/firestore";
import store from '../Redux/Store';
import { itemSet } from '../Redux/Actions';
import { useDispatch } from 'react-redux';

// App Route:

export default function AppRoute ({children}: {children: any}) {
  const [pending, setPending] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const auth = getAuth();
  const dispatch = useDispatch();

  const retrieveCartItems = async (id: any): Promise<any> => {
    try {
      const q = query(collection(fireDB, "users", id, "items"));
      const querySnapshot = await getDocs(q);
      let itemsArr: any[] = [];
      querySnapshot.forEach(doc => {
        itemsArr.push(doc.data());
      });
      itemsArr.forEach(item => {
        dispatch(itemSet(item.id, item.title, item.image, item.price, item.quantity));
      });
      const cart = store.getState();
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      alert(`Error: ${err}`);
    }
  }

 useEffect(() => {
  const unsub = onAuthStateChanged(
   auth,
   user => {
    if (user) {
      setCurrentUser(user);
      retrieveCartItems(user.uid);
    } else {
      setCurrentUser(null);
    }
    setPending(false);
   },
   err => {
    alert(`Error: ${err}`);
    setPending(false);
   }
  );

  return unsub;
 }, []);

 if (pending) return null;

 if (currentUser) {
  if (localStorage.getItem("checkout")) localStorage.removeItem("checkout");
  return (
    <div>
      <NavBar />
      {children}
      <Audio />
    </div>
  );
 } else {
   return <Navigate to="/login" />;
 }
}