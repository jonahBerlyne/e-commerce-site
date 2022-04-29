import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import NavBar from '../Components/NavBar';

export default function CheckoutRoute ({children}: {children: any}) {
 const [pending, setPending] = useState<boolean>(true);
 const [currentUser, setCurrentUser] = useState<any>(null);
 const auth = getAuth();

 useEffect(() => {
  const unsub = onAuthStateChanged(
   auth,
   user => {
    user ? setCurrentUser(user) : setCurrentUser(null);
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
  if (localStorage.getItem("checkout")) {
   return (
     <div>
       <NavBar/>
       {children}
     </div>
   );
  } else {
   return <Navigate to="/cart" />;
  }
 } else {
   return <Navigate to="/login" />;
 }
}