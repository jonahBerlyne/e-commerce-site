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
import AppRoute from "./Routes/AppRoute";
import AuthRoute from "./Routes/AuthRoute";
import CheckoutRoute from "./Routes/CheckoutRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppRoute><Home/></AppRoute>}/>
        <Route path="/shop" element={<AppRoute><Shop/></AppRoute>}/>
        <Route path="/shop/:id" element={<AppRoute><ItemDetail/></AppRoute>}/>
        <Route path="/cart" element={<AppRoute><Cart/></AppRoute>}/>
        <Route path="/orders" element={<AppRoute><Orders/></AppRoute>}/>
        <Route path="/checkout" element={<CheckoutRoute><CheckoutPage/></CheckoutRoute>}/>
        <Route path="/register" element={<AuthRoute><Register/></AuthRoute>}/>
        <Route path="/login" element={<AuthRoute><Login/></AuthRoute>}/>
      </Routes>
    </Router>
  );
}