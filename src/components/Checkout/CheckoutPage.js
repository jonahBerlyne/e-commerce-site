import React, { useState, useEffect } from 'react';
import BillingForm from './BillingForm';
import ShippingForm from './ShippingForm';
import fireDB from '../../firebaseConfig';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import store from '../../Redux/Store';
import { itemSet } from '../../Redux/Actions';
import OrderingForm from './OrderingForm';

export default function CheckoutPage() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setSubTotal(parseFloat(subTotal));
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, []);
  
  useEffect(() => {
    cart.forEach(item => {
      store.dispatch(itemSet(item.id, item.title, item.image, item.price, item.quantity));
    });
    setState(store.getState());
  }, [cart]);

  const [state, setState] = useState(store.getState());
  const [subTotal, setSubTotal] = useState(localStorage.getItem("checkout"));
  const { user } = JSON.parse(localStorage.getItem("currentUser"));

  const initialValues = { id: user.uid, billingFirstName: '', billingLastName: '', billingPhone: '', billingEmail: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '', billingCreditCardNum: '', shippingFirstName: '', shippingLastName: '', shippingPhone: '', shippingEmail: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '' };

  const [values, setValues] = useState(initialValues);

  const handleChange = e => {
   setValues({
    ...values,
    [e.target.name]: e.target.value,
   });
  }

  const inputProps = { values, handleChange };
  const orderingProps = { values, state, subTotal };
  const [billing, setBilling] = useState(true);
  const [shipping, setShipping] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const goToShipping = () => {
    setBilling(false);
    setOrdering(false);
    setShipping(true);
  }

  const goToBilling = () => {
    setShipping(false);
    setBilling(true);
  }

  const goToOrdering = () => {
    setShipping(false);
    setOrdering(true);
  }

  const placeOrder = async () => {
    try {
      const total = subTotal + (subTotal * 0.0625) + 3;
      const docRef = doc(fireDB, "users", `${user.uid}`, "orders", `${Date()}`);
      const order = 
        {
          "Items ordered": store.getState(),
          "Total": parseFloat(total.toFixed(2)),
          "Order info": values
        };
      await setDoc(docRef, order);
      alert(`Items ordered`);
      let titleArr = [];
      cart.forEach(item => {
        titleArr.push(item.title);
      });
      for (let i = 0; i < titleArr.length; i++) {
        const docRef = doc(fireDB, "users", `${user.uid}`, "items", `${titleArr[i]}`);
        await deleteDoc(docRef);
      }
      window.location.href = "/";
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