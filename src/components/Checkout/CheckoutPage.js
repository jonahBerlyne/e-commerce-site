import React, { useState, useEffect } from 'react';
import NavBar from "../NavBar";
import BillingForm from './BillingForm';

export default function CheckoutPage() {

  const { user } = JSON.parse(localStorage.getItem("currentUser"));

  const initialValues = { id: user.uid, billingFirstName: '', billingLastName: '', billingPhone: '', billingEmail: '', billingAddress: '', billingCity: '', billingState: '', billingZip: '', billingCreditCardNum: '' };

  const [values, setValues] = useState(initialValues);

  const handleChange = e => {
   setValues({
    ...values,
    [e.target.name]: [e.target.value],
   });
  }

  const formProps = { values, handleChange };

  const showInfo = () => {
    console.log(values);
  }

  return (
   <div>
    <NavBar/>
    <BillingForm {...formProps}/>
    <button onClick={showInfo}>Show Info</button>
   </div>
  )
}