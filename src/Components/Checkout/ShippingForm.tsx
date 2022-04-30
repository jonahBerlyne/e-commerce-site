import React, { useState, useEffect } from 'react';
import { InputForm } from './CheckoutPage';

export default function ShippingForm({ values, handleChange }: InputForm) {
  return (
    <div>
      <h2>Shipping Form:</h2>
       <h4>First Name:</h4>
       <input type="text" name="shippingFirstName" value={values.shippingFirstName} onChange={handleChange} placeholder='First Name' required/>
       <h4>Last Name:</h4>
       <input type="text" name="shippingLastName" value={values.shippingLastName} onChange={handleChange} placeholder='Last Name' required/>
       <h4>Phone Number:</h4>
       <input type="text" name="shippingPhone" value={values.shippingPhone} onChange={handleChange} placeholder='Phone Number' required/>
       <h4>E-mail Address:</h4>
       <input type="text" name="shippingEmail" value={values.shippingEmail} onChange={handleChange} placeholder='E-mail Address' required/>
       <h4>Address:</h4>
       <input type="text" name="shippingAddress" value={values.shippingAddress} onChange={handleChange} placeholder='Address' required/>
       <h4>City:</h4>
       <input type="text" name="shippingCity" value={values.shippingCity} onChange={handleChange} placeholder='City' required/>
       <h4>State:</h4>
       <input type="text" name="shippingState" value={values.shippingState} onChange={handleChange} placeholder='State' required/>
       <h4>Zip Code:</h4>
       <input type="text" name="shippingZip" value={values.shippingZip} onChange={handleChange} placeholder='Zip Code' required/>
    </div>
  );
}