import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

// Auth Route:

export default function AuthRoute ({children}: {children: any}) {
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

 if (!currentUser) {
   return children;
 } else {
   return <Navigate to="/"/>;
 }
}