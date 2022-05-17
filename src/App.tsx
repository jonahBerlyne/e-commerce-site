import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ShoppingPage from "./Pages/ShoppingPage";
import ItemPage from "./Pages/ItemPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import NavBar from "./Components/NavBar";
import OrdersPage from "./Pages/OrdersPage";
import AppRoute from "./Routes/AppRoute";
import AuthRoute from "./Routes/AuthRoute";
import CheckoutRoute from "./Routes/CheckoutRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppRoute><ShoppingPage/></AppRoute>}/>
        <Route path="/:id" element={<AppRoute><ItemPage/></AppRoute>}/>
        <Route path="/cart" element={<AppRoute><CartPage/></AppRoute>}/>
        <Route path="/orders" element={<AppRoute><OrdersPage/></AppRoute>}/>
        <Route path="/checkout" element={<CheckoutRoute><CheckoutPage/></CheckoutRoute>}/>
        <Route path="/register" element={<AuthRoute><RegisterPage/></AuthRoute>}/>
        <Route path="/login" element={<AuthRoute><LoginPage/></AuthRoute>}/>
      </Routes>
    </Router>
  );
}