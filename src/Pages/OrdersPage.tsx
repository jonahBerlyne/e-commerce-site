import React, { useState, useEffect } from 'react';
import fireDB, { auth } from '../firebaseConfig';
import { getDocs, query, collection, orderBy } from 'firebase/firestore';
import "../Styles/Orders.css";
import { Table } from "react-bootstrap"; 

export default function Orders() {

 const [orders, setOrders] = useState<any[]>([]);
 const [ordersRetrieved, setOrdersRetrieved] = useState<boolean>(false);

 const retrieveOrders = async (): Promise<any> => {
  try {
   const q = query(collection(fireDB, "users", `${auth.currentUser?.uid}`, "orders"), orderBy("timestamp", "asc"));
   const querySnapshot = await getDocs(q);
   let ordersArr: any[] = [];
   querySnapshot.forEach(doc => {
    const orderInfo = {
     ...doc.data(),
     "timestamp": new Date(doc.data().timestamp?.seconds * 1000).toUTCString()
    };
    ordersArr.push(orderInfo);
   });
   setOrders(ordersArr);
   setOrdersRetrieved(true);
  } catch (err) {
   alert(`Error: ${err}`);
  }
 }

 useEffect(() => {
  retrieveOrders();
 }, []);

 return (
  <div>
   {ordersRetrieved && orders.length === 0 && <h2>You haven't ordered anything, yet.</h2>}
   {orders.map(order => {
    return (
     <div key={order.timestamp}>
      <Table responsive>
       <thead>
        <tr>
         <td>
          <h2 className="ordered-items-header">Items ordered on {order.timestamp}:</h2>
         </td>
        </tr>
       </thead>
       <tbody>
        {order.itemsOrdered.map((item: any) => {
         return (
          <tr key={item.id}>
           <td><h3>{item.title}</h3></td>
           <td><img src={item.image} alt={item.title} className="ordered-item-img" /></td>
           <td><h5>x{item.quantity}</h5></td>
           <td><h3>{item.price}</h3></td>
          </tr>
         )
        })}
       </tbody>
       <tfoot>
        <tr>
         <td>
          <h2 className='ordered-items-footer'>Total (After Tax): ${order.total}</h2>
         </td>
        </tr>
       </tfoot>
      </Table>
      {/* {order !== orders[orders.length - 1] && <hr/>} */}
     </div>
    )
   })}
  </div>
 );
}