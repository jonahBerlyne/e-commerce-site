import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { getAuth, signOut } from 'firebase/auth';


export default function NavBar() {
  
 const auth = getAuth();

 const logout = async (): Promise<any> => {
  try {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    localStorage.removeItem("checkout");
    await signOut(auth);
  } catch (err) {
    alert(`Logout error: ${err}`);
  }
 }

 return (
    <div className='header'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <h1 className="navbar-brand">Welcome {auth.currentUser?.email}!</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span>
                <FaBars size={25} color="gray"/>
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Shop</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">Orders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={logout}>Log Out</Link>
                </li>
              </ul>
            </div>
          </div>
    </nav>
   </div>
  );
}