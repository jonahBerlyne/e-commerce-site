import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebaseConfig';
import "../Styles/Auth.css";

export default function RegisterPage() {
 const [name, setName] = useState<string>('');
 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const [confirmPassword, setConfirmPassword] = useState<string>('');

 const register = async (): Promise<any> => {
  if (password !== confirmPassword) {
   alert("Please confirm your password.");
   return;
  }
  try {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   await updateProfile(userCredential.user, {
    displayName: name
   });
  } catch (err) {
   alert(`Registration error: ${err}`);
  }
 }

 return (
  <div className='auth'>
   <h2 className='auth-header'>Register:</h2>
   <div className="auth-header-border"></div>
   <div className="auth-inputs">
    <input 
     type="text" 
     className='form-control auth-input' placeholder='Name' 
     value={name} 
     onChange={(e) => {setName(e.target.value)}}
     required
    />
    <input 
     type="email" 
     className='form-control auth-input' placeholder='Email' 
     value={email} 
     onChange={(e) => {setEmail(e.target.value)}}
     required
    />
    <input 
     type="password" 
     className='form-control auth-input' placeholder='Password' 
     value={password} 
     onChange={(e) => {setPassword(e.target.value)}}
     required
    />
    <input 
     type="password" 
     className='form-control auth-input' placeholder='Confirm Password' 
     value={confirmPassword} 
     onChange={(e) => {setConfirmPassword(e.target.value)}}
     required
    />
   </div>
   <button className='my-3 btn btn-primary auth-btn' onClick={register}>Register</button>
   <Link to="/login" className='login-link'>Click Here to Login</Link>
  </div>
 );
}