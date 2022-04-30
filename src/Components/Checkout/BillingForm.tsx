import React, { useState, useEffect } from 'react';
import { InputForm } from './CheckoutPage';

export default function BillingForm({ values, handleChange }: InputForm) {
  return (
    <div>
      <h2>Billing Form:</h2>
       <h4>First Name:</h4>
       <input type="text" name="billingFirstName" value={values.billingFirstName} onChange={handleChange} placeholder='First Name' required/>
       <h4>Last Name:</h4>
       <input type="text" name="billingLastName" value={values.billingLastName} onChange={handleChange} placeholder='Last Name' required/>
       <h4>Phone Number:</h4>
       <input type="text" name="billingPhone" value={values.billingPhone} onChange={handleChange} placeholder='Phone Number' required/>
       <h4>E-mail Address:</h4>
       <input type="text" name="billingEmail" value={values.billingEmail} onChange={handleChange} placeholder='E-mail Address' required/>
       <h4>Address:</h4>
       <input type="text" name="billingAddress" value={values.billingAddress} onChange={handleChange} placeholder='Address' required/>
       <h4>City:</h4>
       <input type="text" name="billingCity" value={values.billingCity} onChange={handleChange} placeholder='City' required/>
       <h4>State:</h4>
       <input type="text" name="billingState" value={values.billingState} onChange={handleChange} placeholder='State' required/>
       <h4>Zip Code:</h4>
       <input type="text" name="billingZip" value={values.billingZip} onChange={handleChange} placeholder='Zip Code' required/>
       <h4>Credit Card Number:</h4>
       <input type="password" name="billingCreditCardNum" value={values.billingCreditCardNum} onChange={handleChange} placeholder='Credit Card Number' required/>
    </div>
  );
}