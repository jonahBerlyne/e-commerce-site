import React, { useState, useEffect } from 'react';
import BillingForm from './BillingForm';
import ShippingForm from './ShippingForm';

export default function CheckoutPage() {

  const { user } = JSON.parse(localStorage.getItem("currentUser"));

  const initialValues = { id: user.uid, billingFirstName: '', billingLastName: '', billingPhone: '', billingEmail: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '', billingCreditCardNum: '', shippingFirstName: '', shippingLastName: '', shippingPhone: '', shippingEmail: '', shippingAddress: '', shippingCity: '', shippingState: '', shippingZip: '' };

  const [values, setValues] = useState(initialValues);

  const handleChange = e => {
   setValues({
    ...values,
    [e.target.name]: [e.target.value],
   });
  }

  const formProps = { values, handleChange };
  const [billing, setBilling] = useState(true);
  const [shipping, setShipping] = useState(false);

  const goToShipping = () => {
    setBilling(false);
    setShipping(true);
  }

  const goToBilling = () => {
    setShipping(false);
    setBilling(true);
  }

  const showInfo = () => {
    console.log(values);
  }

  return (
   <div>
    {billing && 
      <div>
        <BillingForm {...formProps}/>
        <button onClick={goToShipping}>Proceed to Shipping</button>
      </div> 
    }
    {shipping && 
      <div>
        <ShippingForm {...formProps}/>
        <button onClick={goToBilling}>Back to Billing</button>
        <button onClick={showInfo}>Show Info</button>
      </div> 
    }
   </div>
  )
}