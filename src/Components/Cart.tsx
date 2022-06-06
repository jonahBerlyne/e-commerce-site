import React, { useState, useEffect } from 'react';
import { setDoc, deleteDoc, doc, query, collection, orderBy, onSnapshot, getDoc } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import "../Styles/Cart.css";
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../Redux/Hooks';
import { closeCart, selectCart } from '../Redux/Slices/cartSlice';
import { motion, AnimatePresence } from "framer-motion";
import { getAuth } from "firebase/auth";

export default function Cart() {

  const [items, setItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const q = query(collection(fireDB, "users", `${getAuth().currentUser?.uid}`, "items"), orderBy("id", "asc"));
    const unsub = onSnapshot(q, snapshot => {
      let itemsArr: any[] = [];
      snapshot.docs.forEach(doc => {
        const itemDoc = {
          ...doc.data()
        };
        itemsArr.push(itemDoc);
      });
      if (itemsArr.length === 0) {
        setSubtotal(0);
        setItems([]);
        return;
      }
      if (itemsArr.length === 1) {
        setSubtotal(itemsArr[0].total);
      }
      if (itemsArr.length > 1) {
        let totalsArr: number[] = [];
        for (let i = 0; i < itemsArr.length; i++) {
          totalsArr.push(itemsArr[i].total);
        }
        const _subtotal = totalsArr.reduce((a, b) => a + b);
        setSubtotal(_subtotal);
      }
      setItems(itemsArr);
    });
    return unsub;
  }, []);

  const handleItem = async (action: string, id: number): Promise<any> => {
    try {
      const docRef = doc(fireDB, "users", `${getAuth().currentUser?.uid}`, "items", `${id}`);
      if (action === "removeItem") {
        await deleteDoc(docRef);
      } else {
        const docSnap = await getDoc(docRef);
        let itemDoc = {};
        if (action === "decreaseItem") {
          itemDoc = {
            ...docSnap.data(),
            "quantity": docSnap.data()?.quantity - 1,
            "total": docSnap.data()?.total - docSnap.data()?.price
          };
        }
        if (action === "increaseItem") {
          itemDoc = {
            ...docSnap.data(),
            "quantity": docSnap.data()?.quantity + 1,
            "total": docSnap.data()?.total + docSnap.data()?.price
          };  
        }
        await setDoc(docRef, itemDoc);
      }
    } catch (err) {
      alert(`Item handling error: ${err}`);
    }
  }

  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goToCheckout = (): void => {
    navigate("/checkout");
    dispatch(closeCart());
  }

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const cartDisplay = {
    hidden: { x: "100%" },
    visible: { x: "0" },
  };

  return (
    <AnimatePresence>
      {cart && (
        <>
          <motion.div 
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => dispatch(closeCart())}
            transition={{ ease: "easeOut", duration: 0.5 }}
            className="backdrop"
          />
          <motion.div
            variants={cartDisplay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ ease: "easeOut", duration: 0.5 }}
            className="cart"
          >
            <div className="close-container">
              <button onClick={() => dispatch(closeCart())} className='close'>
                <svg
                  className="svgClose"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                </svg>
              </button>
              <div className="cart-content-container">
                <h1 data-testid="cart-title" className="cart-title">Cart</h1>
                <div className="cart-list">
                  {items.length === 0 && <h4 className='empty-cart'>Your cart is empty.</h4>}
                  {items.map(item => {
                    return (
                      <div key={item.id} className="cart-item-container">
                        <div className="cart-item-header">
                          <h3 data-testid='cart-item-title' className='cart-item-title'>{item.title}</h3>
                          <Delete sx={{ color: "red" }} className="delete-item-btn"  onClick={() => handleItem("removeItem", item.id)} />
                        </div>
                        <img src={item.image} alt={item.title} className="cart-item-img" />
                        <div className="cart-item-info-container">
                          <h4 className='cart-item-price'>${parseFloat(item.total).toFixed(2)}</h4>
                          <div className='cart-item-quantity-container'>
                            <button 
                              className='btn btn-outline-secondary decrease-item-btn' 
                              onClick={() => handleItem("decreaseItem", item.id)} 
                              disabled={item.quantity === 1}
                            >-
                            </button>
                            <h4 className='cart-item-quantity'>{item.quantity}</h4>
                            <button 
                              className='btn btn-outline-secondary increase-item-btn' 
                              onClick={() => handleItem("increaseItem", item.id)}
                            >+
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {subtotal > 0 && 
                    <div>
                      <h2 className='cart-item-subtotal'>Subtotal: ${subtotal.toFixed(2)}</h2>
                      <button className='btn btn-dark checkout-btn' onClick={goToCheckout}>Checkout</button>
                    </div>
                  }
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}