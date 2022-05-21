import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingPage from "./Pages/ShoppingPage";
import ItemPage from "./Pages/ItemPage";
import CheckoutPage from "./Pages/CheckoutPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import OrdersPage from "./Pages/OrdersPage";
import AppRoute from "./Routes/AppRoute";
import AuthRoute from "./Routes/AuthRoute";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import fireDB, { auth } from "./firebaseConfig";
import { useAppSelector } from "./Redux/Hooks";
import { selectUser } from "./Redux/Slices/userSlice";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import { selectCart } from "./Redux/Slices/cartSlice";

export default function App() {

  const cart = useAppSelector(selectCart);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppRoute><ShoppingPage/></AppRoute>}/>
        <Route path="/:id" element={<AppRoute><ItemPage/></AppRoute>}/>
        <Route path="/orders" element={<AppRoute><OrdersPage/></AppRoute>}/>
        <Route path="/checkout" element={<AppRoute><CheckoutPage/></AppRoute>}/>
        <Route path="/register" element={<AuthRoute><RegisterPage/></AuthRoute>}/>
        <Route path="/login" element={<AuthRoute><LoginPage/></AuthRoute>}/>
      </Routes>
      {/* {cart && <Cart />} */}
    </Router>
  );
}