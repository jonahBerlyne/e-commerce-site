import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import fireDB, { auth } from '../firebaseConfig';
import "../Styles/Auth.css";
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
 const [name, setName] = useState<string>('');
 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const [confirmPassword, setConfirmPassword] = useState<string>('');

 const register = async (): Promise<any> => {
  try {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   await updateProfile(userCredential.user, {
    displayName: name 
   });
   const docRef = doc(fireDB, "users", `${userCredential.user.uid}`);
   const userDoc = {
    name,
    email,
    password
   };
   await setDoc(docRef, userDoc);
  } catch (err) {
   alert(`Registration error: ${err}`);
  }
 }

 return (
  <div className='auth register-mobile'>
   <h2 className='auth-header'>Register:</h2>
   <div className="auth-header-border"></div>
   <div className="auth-inputs">
    <input 
     type="text" 
     className='form-control auth-input' placeholder='Name' 
     data-testid="Name"
     value={name} 
     onChange={(e) => {setName(e.target.value)}}
     maxLength={23}
     required
    />
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
    <input 
     type="password" 
     className='form-control auth-input' placeholder='Confirm Password'
     data-testid="confirmPassword" 
     value={confirmPassword} 
     onChange={(e) => {setConfirmPassword(e.target.value)}}
     maxLength={25}
     required
    />
   </div>
   <button
    data-testid="registerBtn" 
    className='my-3 btn btn-primary auth-btn' onClick={register}
    disabled={
     name === "" ||
     email === "" ||
     password === "" ||
     confirmPassword === "" ||
     password !== confirmPassword
    }>Register
   </button>
   <Link to="/login" className='login-link' data-testid="login-link">Click Here to Login</Link>
  </div>
 );
}