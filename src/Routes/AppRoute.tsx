import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';
import fireDB, { auth } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from '../Redux/Hooks';
import { login, selectUser } from '../Redux/Slices/userSlice';
import { store } from '../Redux/Store';
import "../Styles/App.css";
import { selectCart } from '../Redux/Slices/cartSlice';
import Cart from '../Components/Cart';

export default function AppRoute ({children}: {children: any}) {
  const [pending, setPending] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const getUserInfo = async (user: User): Promise<any> => {
    let storeLength = 0;
    try {
      while (storeLength < 2) {
        const docRef = doc(fireDB, "users", `${user.uid}`);
        const docSnapshot = await getDoc(docRef);
        dispatch(
          login({
            ...docSnapshot.data(),
            id: docSnapshot.id
          })
        );
        storeLength = Object.keys(store.getState().user.user).length;
      }
    } catch (err) {
      alert(`User info retrieval error: ${err}`);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      _user => {
        if (_user) {
          getUserInfo(_user);
          setCurrentUser(_user);
        } else {
          setCurrentUser(null);
        }
        setPending(false);
      },
      err => {
        alert(`Error: ${err}`);
        setPending(false);
      }
    );

    return unsub;
  }, []);

  if (pending) return null;

  if (currentUser) {
    return (
      <div>
        {user?.name &&
          <div className='app-container'> 
            <div className="app-body">
              <NavBar />
              {cart && <Cart />}
              {children}
              <Footer />
            </div>
          </div>
        }
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}