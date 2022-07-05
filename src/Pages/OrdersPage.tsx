import React, { useState, useEffect } from 'react';
import fireDB, { auth } from '../firebaseConfig';
import { getDocs, query, collection, orderBy } from 'firebase/firestore';
import "../Styles/Orders.css";
import { Table } from "react-bootstrap"; 
import { getAuth } from 'firebase/auth';

export default function Orders() {

 const [orders, setOrders] = useState<any[]>([]);
 const [ordersRetrieved, setOrdersRetrieved] = useState<boolean>(false);

 const retrieveOrders = async (): Promise<any> => {
  try {
   const q = query(collection(fireDB, "users", `${getAuth().currentUser?.uid}`, "orders"), orderBy("timestamp", "desc"));
   const querySnapshot = await getDocs(q);
   if (querySnapshot === undefined) {
    setOrdersRetrieved(true);
    return;
   }
   let ordersArr: any[] = [];
   querySnapshot.forEach(doc => {
    ordersArr.push(doc.data());
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
  <div className='orders-page-container'>
   {ordersRetrieved && orders.length === 0 && <h2 className="no-orders-msg">You haven't ordered anything, yet.</h2>}
   {ordersRetrieved && orders.length > 0 && orders.map((order, index) => {
    return (
     <div key={index}>
      <Table responsive>
       <thead>
        <tr>
         <th className='ordered-items-td'>
          <h2 data-testid={`order${(orders.length - index)}Header`} className="ordered-items-header">Order #{(orders.length - index)}:</h2>
         </th>
        </tr>
       </thead>
       <tbody>
        {order.itemsOrdered.map((item: any) => {
         return (
          <tr key={item.id}>
           <td><h3 data-testid={`itemTitle${item.id}-${(orders.length - index)}`}>{item.title}</h3></td>
           <td><img data-testid={`itemImage${item.id}-${(orders.length - index)}`} src={item.image} alt={item.title} className="ordered-item-img" /></td>
           <td><h5 data-testid={`itemQuantity${item.id}-${(orders.length - index)}`}>x{item.quantity}</h5></td>
           <td><h3 data-testid={`itemPrice${item.id}-${(orders.length - index)}`}>{item.price}</h3></td>
          </tr>
         )
        })}
       </tbody>
       <tfoot>
        <tr>
         <td>
          <h2 data-testid={`order${(orders.length - index)}Total`} className='ordered-items-footer'>Total (After Tax): ${order.total}</h2>
         </td>
        </tr>
       </tfoot>
      </Table>
     </div>
    )
   })}
  </div>
 );
}