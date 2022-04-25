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
        <Route path="/" exact element={<AppRoute><Home/></AppRoute>}/>
        <Route path="/shop" exact element={<AppRoute><Shop/></AppRoute>}/>
        <Route path="/shop/:id" exact element={<AppRoute><ItemDetail/></AppRoute>}/>
        <Route path="/cart" exact element={<AppRoute><Cart/></AppRoute>}/>
        <Route path="/orders" exact element={<AppRoute><Orders/></AppRoute>}/>
        <Route path="/checkout" exact element={<CheckoutRoute><CheckoutPage/></CheckoutRoute>}/>
        <Route path="/register" exact element={<AuthRoute><Register/></AuthRoute>}/>
        <Route path="/login" exact element={<AuthRoute><Login/></AuthRoute>}/>
      </Routes>
    </Router>
  );
}

// const ProtectedRoutes = ({children}) => {
//   if (localStorage.getItem("currentUser")) {
//     localStorage.removeItem("checkout");
//     return (
//       <div>
//         <NavBar/>
//         {children}
//       </div>
//     );
//   } else {
//     return <Navigate to="/login"/>;
//   }
// }

// const CheckoutRoute = ({children}) => {
//   if (localStorage.getItem("checkout")) {
//     return (
//       <div>
//         <NavBar/>
//         {children}
//       </div>
//     );
//   } else {
//     return <Navigate to="/cart"/>;
//   }
// }

// const AuthRoutes = ({children}) => {
//   if (!localStorage.getItem("currentUser")) {
//     return children;
//   } else {
//     return <Navigate to="/"/>;
//   }
// }