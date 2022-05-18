import React, { useState, useEffect } from 'react';
import BillingForm from '../Components/Checkout/BillingForm';
import ShippingForm from '../Components/Checkout/ShippingForm';
import fireDB, { auth } from '../firebaseConfig';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import store from '../Redux/Store';
import { setItemToCart } from '../Redux/Cart/CartActions';
import OrderingForm from '../Components/Checkout/OrderingForm';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import { useNavigate } from 'react-router-dom';
import "../Styles/Checkout.css";
import { selectCart } from '../Redux/Slices/cartSlice';

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

  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const [checkoutCart, setCheckoutCart] = useState<any[]>([]);

  useEffect(() => {
    const checkoutTotal: string | null = localStorage.getItem("checkout");
    const parsedSubTotal: number = parseFloat(checkoutTotal!);
    setSubTotal(parsedSubTotal);
    setCheckoutCart(JSON.parse(localStorage.getItem("cart") || "{}"));
  }, []);
  
  useEffect(() => {
    checkoutCart.forEach(item => {
      dispatch(setItemToCart(item.id, item.title, item.image, item.price, item.quantity));
    });
    setState(cart);
  }, [checkoutCart]);

  const [state, setState] = useState<any[]>(cart);
  const [subTotal, setSubTotal] = useState<number>(0);

  const initialValues = { id: auth.currentUser?.uid, billingFirstName: '', billingLastName: '', billingPhone: '', billingEmail: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '', billingCreditCardNum: '', shippingFirstName: '', shippingLastName: '', shippingPhone: '', shippingEmail: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '' };

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

  const navigate = useNavigate();

  const placeOrder = async (): Promise<any> => {
    const timestamp = serverTimestamp();
    try {
      const total = subTotal + (subTotal * 0.0625) + 3;
      const docRef = doc(fireDB, "users", `${auth.currentUser?.uid}`, "orders", `${timestamp}`);
      const order = 
        {
          "itemsOrdered": store.getState(),
          "orderInfo": values,
          timestamp,
          "total": parseFloat(total.toFixed(2))
        };
      await setDoc(docRef, order);
      alert(`Items ordered`);
      let titleArr: any[] = [];
      checkoutCart.forEach(item => {
        titleArr.push(item.title);
      });
      for (let i = 0; i < titleArr.length; i++) {
        const docRef = doc(fireDB, "users", `${auth.currentUser?.uid}`, "items", `${titleArr[i]}`);
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