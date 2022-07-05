import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { signOut } from 'firebase/auth';
import fireDB, { auth } from "../firebaseConfig";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import { logout, selectUser } from "../Redux/Slices/userSlice";
import { openCart } from "../Redux/Slices/cartSlice";
import "../Styles/NavBar.css";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function NavBar() {

 const [quantity, setQuantity] = useState<number>(0);

 useEffect(() => {
   const q = query(collection(fireDB, "users", `${auth.currentUser?.uid}`, "items"));
   const unsub = onSnapshot(q, snapshot => {
     let itemsArr: number[] = [];
     snapshot.docs.forEach(doc => {
       itemsArr.push(doc.data().quantity);
     });
     if (itemsArr.length > 0) {
       const numItems = itemsArr.reduce((a, b) => a + b);
       setQuantity(numItems);
     } else {
       setQuantity(0);
     }
   });
   return unsub;
 }, []);

 const user = useAppSelector(selectUser);
 const dispatch = useAppDispatch(); 

 const logOut = async (): Promise<any> => {
  try {
    dispatch(logout());
    await signOut(auth);
  } catch (err) {
    alert(`Logout error: ${err}`);
    console.log(err);
  }
 }

 const navigate = useNavigate();

 return (
    <div className='header'>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid navbar-container">
            {user?.name && <h1 className="navbar-brand">{user?.name}, welcome to the <img src="/Images/Seinfeld_Logo.png" alt="Seinfeld" className="seinfeld-logo" /> store!</h1>}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span>
                <FaBars size={25} color="gray"/>
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto nav-items">
                <li className="nav-item" onClick={() => navigate("/")}>                 
                  <p>Home</p>
                </li>
                <li className="nav-item" onClick={() => navigate("/orders")}>
                  <p>Orders</p>
                </li>
                <li className="nav-item" onClick={() => dispatch(openCart())}>
                  <div className="shopping-cart">
                    <p>Cart</p>
                    {quantity > 0 && <p className="quantity">({quantity})</p>}
                  </div>
                </li>
                <li className="nav-item" onClick={() => logOut()}>
                  <p>Sign Out</p>
                </li>
              </ul>
            </div>
          </div>
    </nav>
   </div>
  );
}