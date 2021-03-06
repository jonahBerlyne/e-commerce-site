import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import "../Styles/Auth.css";

export default function LoginPage() {
 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');

 const signIn = async (): Promise<any> => {
  try {
   await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
   alert(`Login error: ${err}`);
  }
 }

 return (
  <div className='auth'>
   <h2 className='auth-header'>Login:</h2>
   <div className="auth-header-border"></div>
   <div className="auth-inputs">
    <input 
     type="email" 
     className='form-control auth-input' placeholder='Email'
     data-testid="Email" 
     value={email} 
     onChange={(e) => {setEmail(e.target.value)}}
     maxLength={30}
     required
    />
    <input 
     type="password" 
     className='form-control auth-input' placeholder='Password' 
     data-testid="Password" 
     value={password} 
     onChange={(e) => {setPassword(e.target.value)}}
     maxLength={25}
     required
    />
   </div>
   <button 
    data-testid="loginBtn" 
    className='my-3 btn btn-primary auth-btn' 
    onClick={signIn}
    disabled={
     email === "" ||
     password === ""
    }>Login
   </button>
   <hr/>
   <Link to="/register" className='register-link' data-testid="register-link">Click Here to Register</Link>
  </div>
 );
}