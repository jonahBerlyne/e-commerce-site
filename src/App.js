import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
        <Route path="/" exact element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
        <Route path="/shop" exact element={<ProtectedRoutes><Shop/></ProtectedRoutes>}/>
        <Route path="/shop/:id" exact element={<ProtectedRoutes><ItemDetail/></ProtectedRoutes>}/>
        <Route path="/cart" exact element={<ProtectedRoutes><Cart/></ProtectedRoutes>}/>
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/login" exact element={<Login/>}/>
      </Routes>
    </Router>
  );
}

const ProtectedRoutes = ({children}) => {
  if (localStorage.getItem("currentUser")) {
    return children;
  } else {
    return <Navigate to="/login"/>;
  }
}