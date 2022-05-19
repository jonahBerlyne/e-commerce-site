import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingPage from "./Pages/ShoppingPage";
import ItemPage from "./Pages/ItemPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import OrdersPage from "./Pages/OrdersPage";
import AppRoute from "./Routes/AppRoute";
import AuthRoute from "./Routes/AuthRoute";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import fireDB, { auth } from "./firebaseConfig";

export default function App() {

  const [checkout, setCheckout] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(fireDB, "users", `${auth.currentUser?.uid}`, "items"));
    const unsub = onSnapshot(q, snapshot => {
      snapshot.docs.length > 0 ? setCheckout(true) : setCheckout(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (auth.currentUser) console.log(`checkout is: ${checkout}`);
  }, [checkout]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppRoute><ShoppingPage/></AppRoute>}/>
        <Route path="/:id" element={<AppRoute><ItemPage/></AppRoute>}/>
        <Route path="/cart" element={<AppRoute><CartPage/></AppRoute>}/>
        <Route path="/orders" element={<AppRoute><OrdersPage/></AppRoute>}/>
        {checkout && <Route path="/checkout" element={<AppRoute><CheckoutPage/></AppRoute>}/>}
        <Route path="/register" element={<AuthRoute><RegisterPage/></AuthRoute>}/>
        <Route path="/login" element={<AuthRoute><LoginPage/></AuthRoute>}/>
      </Routes>
    </Router>
  );
}