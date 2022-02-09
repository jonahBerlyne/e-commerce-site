import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Shop from "./Components/Shop";
import ItemDetail from "./Components/ItemDetail";
import Cart from "./Components/Cart";
import Register from "./Components/Register";
import Login from "./Components/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/shop/:id" element={<ItemDetail/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}