import React, { useState, useEffect } from 'react';
import BillingForm from '../Components/Checkout/BillingForm';
import ShippingForm from '../Components/Checkout/ShippingForm';
import fireDB, { auth } from '../firebaseConfig';
import { doc, deleteDoc, serverTimestamp, collection, addDoc, query, getDocs } from 'firebase/firestore';
import OrderingForm from '../Components/Checkout/OrderingForm';
import { useNavigate } from 'react-router-dom';
import "../Styles/Checkout.css";

interface Values {
  id: any;
  billingFirstName: string;
  billingLastName: string;
  billingPhone: string;
  billingEmail: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCreditCardNum: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingPhone: string;
  shippingEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
};

export default function CheckoutPage() {

  const [billing, setBilling] = useState<boolean>(false);
  const [checkoutCart, setCheckoutCart] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);

  const navigate = useNavigate();

  const getSubTotal = async (): Promise<any> => {
    try {
      const q = query(collection(fireDB, "users", `${auth.currentUser?.uid}`, "items"));
      const querySnapshot = await getDocs(q);
      let itemsArr: any[] = [];
      querySnapshot.forEach(doc => {
        itemsArr.push(doc.data());
      });
      if (itemsArr.length === 0) {
        navigate("/");
        return;
      }
      setItems(itemsArr);
      const _subTotal = itemsArr.reduce((a, b) => a.total + b.total);
      setSubTotal(_subTotal);
      setBilling(true);
    } catch (err) {
      alert(`Subtotal retrieval error: ${err}`);
    }
  }

  useEffect(() => {
    getSubTotal();
    return () => {
      setBilling(false);
      setShipping(false);
      setOrdering(false);
    }
  }, []);
  
  const initialValues = { id: auth.currentUser?.uid, billingFirstName: '', billingLastName: '', billingPhone: '', billingEmail: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '', billingCreditCardNum: '', shippingFirstName: '', shippingLastName: '', shippingPhone: '', shippingEmail: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '' };

  const [values, setValues] = useState<Values>(initialValues);

  const handleChange = (e: any): void => {
   setValues({
    ...values,
    [e.target.name]: e.target.value,
   });
  }

  const inputProps = { values, handleChange };
  const orderingProps = { values, items, subTotal };
  const [shipping, setShipping] = useState<boolean>(false);
  const [ordering, setOrdering] = useState<boolean>(false);

  const goToShipping = (): void => {
    setBilling(false);
    setOrdering(false);
    setShipping(true);
  }

  const goToBilling = (): void => {
    setShipping(false);
    setBilling(true);
  }

  const goToOrdering = (): void => {
    setShipping(false);
    setOrdering(true);
  }

  const placeOrder = async (): Promise<any> => {
    const timestamp = serverTimestamp();
    try {
      const total = subTotal + (subTotal * 0.0625) + 3;
      const collectionRef = collection(fireDB, "users", `${auth.currentUser?.uid}`, "orders");
      const order = 
        {
          "itemsOrdered": items,
          "orderInfo": values,
          timestamp,
          "total": parseFloat(total.toFixed(2))
        };
      await addDoc(collectionRef, order);
      alert(`Items ordered`);
      for (let i = 0; i < items.length; i++) {
        const docRef = doc(fireDB, "users", `${auth.currentUser?.uid}`, "items", `${items[i].id}`);
        await deleteDoc(docRef);
      }
      navigate("/");
    } catch (err) {
      alert(`Ordering error: ${err}`);
    }
  }

  return (
   <div>
    {billing && 
      <div>
        <BillingForm {...inputProps}/>
        <button onClick={goToShipping}>Proceed to Shipping</button>
      </div> 
    }
    {shipping && 
      <div>
        <ShippingForm {...inputProps}/>
        <button onClick={goToBilling}>Back to Billing</button>
        <button onClick={goToOrdering}>Review Order</button>
      </div> 
    }
    {ordering &&
      <div>
        <OrderingForm {...orderingProps}/>
        <button onClick={goToShipping}>Back to Shipping</button>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    }
   </div>
  )
}

export interface InputForm {
  values: any;
  handleChange: (e: any) => void;
};