import React, { useState, useEffect } from 'react';
import { setDoc, deleteDoc, doc, query, collection, orderBy, onSnapshot, getDoc } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import "../Styles/Cart.css";
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function CartPage() {

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
      } else {
        const _totalPrice = itemsArr.reduce((a, b) => a.total + b.total);
        setTotalPrice(_totalPrice);
      }
      setItems(itemsArr);
    });
    return unsub;
  }, []);

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

  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Cart Page</h1>
      {items.length === 0 && <h2>Your cart is empty.</h2>}
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
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </div>
      }
    </div>
  );
}