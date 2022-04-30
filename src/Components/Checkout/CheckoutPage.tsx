import React, { useState, useEffect } from 'react';
import BillingForm from './BillingForm';
import ShippingForm from './ShippingForm';
import fireDB from '../../firebaseConfig';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import store from '../../Redux/Store';
import { itemSet } from '../../Redux/Actions';
import OrderingForm from './OrderingForm';
import { useDispatch } from 'react-redux';

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

  const dispatch = useDispatch();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const checkoutTotal: string | null = localStorage.getItem("checkout");
    const parsedSubTotal: number = parseFloat(checkoutTotal!);
    setSubTotal(parsedSubTotal);
    setCart(JSON.parse(localStorage.getItem("cart") || "{}"));
  }, []);
  
  useEffect(() => {
    cart.forEach(item => {
      dispatch(itemSet(item.id, item.title, item.image, item.price, item.quantity));
    });
    setState(store.getState());
  }, [cart]);

  const [state, setState] = useState(store.getState());
  const [subTotal, setSubTotal] = useState<number>(0);
  const { user } = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const initialValues = { id: user.uid, billingFirstName: '', billingLastName: '', billingPhone: '', billingEmail: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '', billingCreditCardNum: '', shippingFirstName: '', shippingLastName: '', shippingPhone: '', shippingEmail: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '' };

  const [values, setValues] = useState<Values>(initialValues);

  const handleChange = (e: any): void => {
   setValues({
    ...values,
    [e.target.name]: e.target.value,
   });
  }

  const inputProps = { values, handleChange };
  const orderingProps = { values, state, subTotal };
  const [billing, setBilling] = useState<boolean>(true);
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
    try {
      const total = subTotal + (subTotal * 0.0625) + 3;
      const docRef = doc(fireDB, "users", `${user.uid}`, "orders", `${Date()}`);
      const order = 
        {
          "itemsOrdered": store.getState(),
          "total": parseFloat(total.toFixed(2)),
          "orderInfo": values
        };
      await setDoc(docRef, order);
      alert(`Items ordered`);
      let titleArr: any[] = [];
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

export interface InputForm {
  values: any;
  handleChange: (e: any) => void;
};