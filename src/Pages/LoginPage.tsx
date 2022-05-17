import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../Styles/Auth.css";

export default function LoginPage() {
 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const auth = getAuth();

 const login = async (): Promise<any> => {
  try {
   await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
   alert(`Login error: ${err}`);
  }
 }

 return (
  <div>
   <h2>Login:</h2>
   <input 
    type="email" 
    className='form-control' placeholder='Email' 
    value={email} 
    onChange={(e) => {setEmail(e.target.value)}}
   />
   <input 
    type="password" 
    className='form-control' placeholder='Password' 
    value={password} 
    onChange={(e) => {setPassword(e.target.value)}}
   />
   <button className='my-3' onClick={login}>Login</button>
   <hr/>
   <Link to="/register">Click Here to Register</Link>
  </div>
 );
}