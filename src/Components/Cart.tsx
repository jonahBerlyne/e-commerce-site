import React, { useState, useEffect } from 'react';
import { setDoc, deleteDoc, doc, query, collection, orderBy, onSnapshot, getDoc } from "firebase/firestore";
import fireDB, { auth } from '../firebaseConfig';
import "../Styles/Cart.css";
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../Redux/Hooks';
import { closeCart, selectCart } from '../Redux/Slices/cartSlice';
import { Modal } from 'react-bootstrap';

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

  return (
     <Modal
        show={cart}
        onHide={() => dispatch(closeCart())}
        dialogClassName="modal-90w"
        className="modal right fade"
        animation
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className='modal-title'>
            Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
             {items.length === 0 && <h4>Your cart is empty.</h4>}
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
        </Modal.Body>
      </Modal>
  );

  // return (
  //   <div className="modal right fade">
  //     <div className="modal-dialog">
  //       <div className="modal-content">

  //         <div className="modal-header">
  //           <button type='button' className='close' onClick={() => dispatch(closeCart())}><span>&times;</span></button>
  //           <h2 className='modal-title'>Cart</h2>
  //         </div>

  //         <div className="modal-body">
  //           {items.length === 0 && <h4>Your cart is empty.</h4>}
  //           {items.map(item => {
  //             return (
  //               <div key={item.id}>
  //                 <h3>{item.title}</h3>
  //                 <img src={item.image} alt={item.title} height="100px" width="100px"/>
  //                 <br/>
  //                 <br/>
  //                 <div style={{display: "flex", gap: "5px"}}>
  //                   <button 
  //                     className='btn btn-outline-secondary' 
  //                     onClick={() => handleItem("decreaseItem", item.id)} 
  //                     disabled={item.quantity === 1}
  //                   >-
  //                   </button>
  //                   <h4>{item.quantity}</h4>
  //                   <button 
  //                     className='btn btn-outline-secondary' 
  //                     onClick={() => handleItem("increaseItem", item.id)}
  //                   >+
  //                   </button>
  //                 </div>
  //                 <h4>Price: ${parseFloat(item.total).toFixed(2)}</h4>
  //                 <IconButton onClick={() => handleItem("removeItem", item.id)}>
  //                   <Delete sx={{ color: "red" }} />
  //                 </IconButton>
  //               </div>
  //             );
  //           })}
  //           {totalPrice > 0 && 
  //             <div>
  //               <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
  //               <button onClick={() => navigate("/checkout")}>Checkout</button>
  //             </div>
  //           }
  //         </div>

  //       </div>
  //     </div>
  //   </div>
  // );
}