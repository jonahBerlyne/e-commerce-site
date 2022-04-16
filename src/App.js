import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import ItemDetail from "./Components/ItemDetail";
import Cart from "./Components/Cart";
import CheckoutPage from "./Components/Checkout/CheckoutPage";
import Register from "./Components/Register";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import Orders from "./Components/Orders";
import Audio from "./Components/Audio";
import fireDB from "./firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {

  const AuthNav = () => {
    return (
      <Router>
        <Routes>
          <Route path="/register" exact element={<AuthRoutes><Register/></AuthRoutes>}/>
          <Route path="/login" exact element={<AuthRoutes><Login/></AuthRoutes>}/>
        </Routes>
      </Router>
    );
  }

  const AppNav = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" exact element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          <Route path="/shop" exact element={<ProtectedRoutes><Shop/></ProtectedRoutes>}/>
          <Route path="/shop/:id" exact element={<ProtectedRoutes><ItemDetail/></ProtectedRoutes>}/>
          <Route path="/cart" exact element={<ProtectedRoutes><Cart/></ProtectedRoutes>}/>
          <Route path="/orders" exact element={<ProtectedRoutes><Orders/></ProtectedRoutes>}/>
          <Route path="/checkout" exact element={<CheckoutRoute><CheckoutPage/></CheckoutRoute>}/>
        </Routes>
      </Router>
    );
  }

  const auth = getAuth();

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, _user => {
    _user ? setUser(_user) : setUser(null);
  });

  return (
    <div>
      {user ? <AppNav /> : <AuthNav />}
    </div>
  );
} 

const ProtectedRoutes = ({children}) => {
  if (localStorage.getItem("currentUser")) {
    localStorage.removeItem("checkout");
    return (
      <div>
        <NavBar/>
        {children}
        <footer><Audio/></footer>
      </div>
    );
  } else {
    return <Navigate to="/login"/>;
  }
}

const CheckoutRoute = ({children}) => {
  if (localStorage.getItem("checkout")) {
    return (
      <div>
        <NavBar/>
        {children}
      </div>
    );
  } else {
    return <Navigate to="/cart"/>;
  }
}

const AuthRoutes = ({children}) => {
  if (!localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/"/>;
  }
}

