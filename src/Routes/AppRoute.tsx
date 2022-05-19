import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import NavBar from '../Components/NavBar';
import Audio from '../Components/Audio';
import fireDB, { auth } from '../firebaseConfig';
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { setItemToCart } from '../Redux/Cart/CartActions';
import { useAppSelector, useAppDispatch } from '../Redux/Hooks';
import { selectCart } from '../Redux/Slices/cartSlice';
import { login, selectUser } from '../Redux/Slices/userSlice';
import store from '../Redux/Store';

export default function AppRoute ({children}: {children: any}) {
  const [pending, setPending] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const user = useAppSelector(selectUser);
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const retrieveCartItems = async (id: any): Promise<any> => {
    try {
      const q = query(collection(fireDB, "users", id, "items"));
      const querySnapshot = await getDocs(q);
      let itemsArr: any[] = [];
      querySnapshot.forEach(doc => {
        itemsArr.push(doc.data());
      });
      itemsArr.forEach(item => {
        dispatch(setItemToCart(item.id, item.title, item.image, item.price, item.quantity));
      });
      console.log(`cart: ${cart}`);
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      alert(`Error: ${err}`);
    }
  }

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
          retrieveCartItems(_user?.uid);
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
    if (localStorage.getItem("checkout")) localStorage.removeItem("checkout");
    return (
      <div>
        {user?.name &&
          <> 
            <NavBar />
            {children}
            <Audio />
          </>
        }
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}