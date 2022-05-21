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

export default function Cart() {

  const [items, setItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const q = query(collection(fireDB, "users", `${auth.currentUser?.uid}`, "items"));
    const unsub = onSnapshot(q, snapshot => {
      let itemsArr: any[] = [];
      snapshot.docs.forEach(doc => {
        const itemDoc = {
          ...doc.data()
        };
        itemsArr.push(itemDoc);
      });
      if (itemsArr.length === 0) {
        setTotalPrice(0);
        setItems([]);
        return;
      }
      if (itemsArr.length === 1) {
        setTotalPrice(itemsArr[0].total);
      }
      if (itemsArr.length > 1) {
        let totalsArr: number[] = [];
        for (let i = 0; i < itemsArr.length; i++) {
          totalsArr.push(itemsArr[i].total);
        }
        const _totalPrice = totalsArr.reduce((a, b) => a + b);
        console.log(_totalPrice);
        setTotalPrice(_totalPrice);
      }
      setItems(itemsArr);
    });
    return unsub;
  }, []);

  useEffect(() => {
    console.log(totalPrice);
  }, [totalPrice]);

  const handleItem = async (action: string, id: number): Promise<any> => {
    try {
      const docRef = doc(fireDB, "users", `${auth.currentUser?.uid}`, "items", `${id}`);
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
            <div className="container">
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
                <h1 className="title">Cart</h1>
                <div className="cart-list">
                  {items.length === 0 && <h4 className='empty-cart'>Your cart is empty.</h4>}
                  {items.map(item => {
                    return (
                      <div key={item.id}>
                        <h3>{item.title}</h3>
                        <img src={item.image} alt={item.title} height="100px" width="100px"/>
                        <br/>
                        <br/>
                        <div style={{display: "flex", gap: "5px"}}>
                          <button 
                            className='btn btn-outline-secondary' 
                            onClick={() => handleItem("decreaseItem", item.id)} 
                            disabled={item.quantity === 1}
                          >-
                          </button>
                          <h4>{item.quantity}</h4>
                          <button 
                            className='btn btn-outline-secondary' 
                            onClick={() => handleItem("increaseItem", item.id)}
                          >+
                          </button>
                        </div>
                        <h4>Price: ${parseFloat(item.total).toFixed(2)}</h4>
                        <IconButton onClick={() => handleItem("removeItem", item.id)}>
                          <Delete sx={{ color: "red" }} />
                        </IconButton>
                      </div>
                    );
                  })}
                  {totalPrice > 0 && 
                    <div>
                      <h2 className='total-price'>Total Price: ${totalPrice.toFixed(2)}</h2>
                      <button onClick={() => navigate("/checkout")}>Checkout</button>
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