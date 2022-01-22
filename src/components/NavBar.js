import { Link } from "react-router-dom";

export default function NavBar() {

 const navStyle = {
  backgroundColor: "DodgerBlue",
  padding: "30px",
  margin: "-10px",
  fontSize: "25px",
  fontFamily: "helvetica",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
 };

 const linkStyle = {
  textDecoration: "none",
  cursor: "pointer",
  color: "darkRed",
  backgroundColor: "green",
  padding: "10px",
 };

 return (
  <nav style={navStyle}>
   <div style={{paddingRight: "100px"}}>
    Welcome!
   </div>
   <div style={{display: "flex", gap: "20px"}}>
    <Link to="/" style={linkStyle}>Home</Link>
    <Link to="/shop" style={linkStyle}>Shop</Link>
    <Link to="/cart" style={linkStyle}>Cart</Link>
   </div>
  </nav>
 );
}