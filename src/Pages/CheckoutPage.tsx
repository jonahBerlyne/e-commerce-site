import React, { useState, useEffect } from 'react';
import BillingForm from '../Components/Checkout/BillingForm';
import ShippingForm from '../Components/Checkout/ShippingForm';
import fireDB, { auth } from '../firebaseConfig';
import { doc, deleteDoc, serverTimestamp, collection, addDoc, query, getDocs, orderBy } from 'firebase/firestore';
import OrderingForm from '../Components/Checkout/OrderingForm';
import { useNavigate } from 'react-router-dom';
import "../Styles/Checkout.css";
import { useAppSelector } from "../Redux/Hooks";
import { selectCart } from "../Redux/Slices/cartSlice";
import { getAuth } from 'firebase/auth';

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

  const [billing, setBilling] = useState<boolean>(true);
  const [items, setItems] = useState<any[]>([]);
  const [numItems, setNumItems] = useState<number>(0);
  const [subTotal, setSubTotal] = useState<number>(0);

  const cart = useAppSelector(selectCart);
  const navigate = useNavigate();

  const getSubTotal = async (): Promise<any> => {
    try {
      const q = query(collection(fireDB, "users", `${getAuth().currentUser?.uid}`, "items"), orderBy("id", "asc"));
      const querySnapshot = await getDocs(q);
      if (querySnapshot === undefined) {
        navigate("/");
        return;
      }
      let itemsArr: any[] = [];
      let qtyArr: number[] = [];
      let totalsArr: number[] = [];
      querySnapshot.forEach(doc => {
        itemsArr.push(doc.data());
        qtyArr.push(doc.data().quantity);
        totalsArr.push(doc.data().total);
      });
      if (itemsArr.length === 0) {
        navigate("/");
        return;
      }
      setItems(itemsArr);
      const _numItems = qtyArr.reduce((a, b) => a + b);
      setNumItems(_numItems);
      const _subTotal = totalsArr.reduce((a, b) => a + b);
      setSubTotal(_subTotal);
    } catch (err) {
      alert(`Subtotal retrieval error: ${err}`);
    }
  }

  useEffect(() => {
    getSubTotal();
  }, [cart]);
  
  const initialValues = { id: getAuth().currentUser?.uid, billingFirstName: '', billingLastName: '', billingPhone: '', billingEmail: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '', billingCreditCardNum: '', shippingFirstName: '', shippingLastName: '', shippingPhone: '', shippingEmail: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '' };

  const [values, setValues] = useState<Values>(initialValues);

  const handleChange = (e: any): void => {
   setValues({
    ...values,
    [e.target.name]: e.target.value,
   });
  }

  const inputProps = { values, handleChange };
  const orderingProps = { values, items, numItems, subTotal };
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
      const collectionRef = collection(fireDB, "users", `${getAuth().currentUser?.uid}`, "orders");
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
        const docRef = doc(fireDB, "users", `${getAuth().currentUser?.uid}`, "items", `${items[i].id}`);
        await deleteDoc(docRef);
      }
      navigate("/orders");
    } catch (err) {
      alert(`Ordering error: ${err}`);
    }
  }

  return (
   <div className='checkout-container'>
    {billing && items.length > 0 && 
      <div className='form-container'>
        <BillingForm {...inputProps}/>
        <button
          data-testid="goToShippingBtn" 
          onClick={goToShipping} 
          className="btn btn-dark form-btn"
          disabled={
            values.billingFirstName === "" ||
            values.billingLastName === "" ||
            values.billingPhone === "" ||
            values.billingEmail === "" ||
            values.billingAddress === "" ||
            values.billingCity === "" ||
            values.billingState === "" ||
            values.billingZip === "" ||
            values.billingCreditCardNum === ""
          }
        >
          Proceed to Shipping
        </button>
      </div> 
    }
    {shipping && 
      <div className='form-container'>
        <ShippingForm {...inputProps}/>
        <div className="shipping-form-btns">
          <button 
            onClick={goToBilling} 
            className="btn btn-dark form-btn"
          >
            Back to Billing
          </button>
          <button 
            data-testid="goToOrderingBtn"
            onClick={goToOrdering} 
            className="btn btn-dark form-btn"
            disabled={
              values.shippingFirstName === "" ||
              values.shippingLastName === "" ||
              values.shippingPhone === "" ||
              values.shippingEmail === "" ||
              values.shippingAddress === "" ||
              values.shippingCity === "" ||
              values.shippingState === "" ||
              values.shippingZip === ""
            }
          >
            Review Order
          </button>
        </div>
      </div> 
    }
    {ordering &&
      <div className='ordering-container'>
        <OrderingForm {...orderingProps}/>
        <div className="ordering-form-btns">
          <button onClick={goToShipping} className="btn btn-dark form-btn">Back to Shipping</button>
          <button data-testid="placeOrderBtn" onClick={placeOrder} className="btn btn-success order-btn">Place Order</button>
        </div>
      </div>
    }
   </div>
  );
}

export interface InputForm {
  values: any;
  handleChange: (e: any) => void;
};