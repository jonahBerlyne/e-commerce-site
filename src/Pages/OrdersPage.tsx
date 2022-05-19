import React, { useState, useEffect } from 'react';
import fireDB, { auth } from '../firebaseConfig';
import { getDocs, query, collection } from 'firebase/firestore';
import "../Styles/Orders.css";

export default function Orders() {

 const [orders, setOrders] = useState<any[]>([]);
 const [ordersRetrieved, setOrdersRetrieved] = useState<boolean>(false);

 const retrieveOrders = async (): Promise<any> => {
  try {
   const q = query(collection(fireDB, "users", `${auth.currentUser?.uid}`, "orders"));
   const querySnapshot = await getDocs(q);
   let ordersArr: any[] = [];
   querySnapshot.forEach(doc => {
    const orderInfo = {...doc.data(), date: doc.id};
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
     <div key={order.date}>
      <table>
       <thead><h2>Items ordered on {order.date}:</h2></thead>
       <tbody>
        {order.itemsOrdered.map((item: any) => {
         return (
          <tr key={item.id}>
           <td><h3>{item.title}</h3></td>
           <td><img src={item.image} alt={item.title} height="100px" width="100px"/></td>
           <td><h5>x{item.quantity}</h5></td>
           <td><h3>{item.price}</h3></td>
          </tr>
         )
        })}
       </tbody>
       <tfoot><h2>Total (After Tax): ${order.total}</h2></tfoot>
      </table>
      {order !== orders[orders.length - 1] && <hr/>}
     </div>
    )
   })}
  </div>
 );
}