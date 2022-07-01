import React, { useState, useEffect } from 'react';
import { InputForm } from '../../Pages/CheckoutPage';
import { Form, Button } from "react-bootstrap";

export default function BillingForm({ values, handleChange }: InputForm) {
  return (
    <Form className="checkout-form">
      <Form.Label className="checkout-form-header">Billing:</Form.Label>
      <Form.Group className='mb-3 checkout-inputs-container'>

        <Form.Group className="mb-3 checkout-inputs-row">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">First Name:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingFirstName" name="billingFirstName" placeholder="First Name" value={values.billingFirstName} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Last Name:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingLastName" name="billingLastName" placeholder="Last Name" value={values.billingLastName} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Phone Number:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingPhone" name="billingPhone" placeholder="Phone Number" value={values.billingPhone} onChange={handleChange} />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3 checkout-inputs-row" controlId="formBasicEmail">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">E-mail Address:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingEmail" name="billingEmail" placeholder="E-mail Address" value={values.billingEmail} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Address:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingAddress" name="billingAddress" placeholder="Address" value={values.billingAddress} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">City:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingCity" name="billingCity" placeholder="City" value={values.billingCity} onChange={handleChange} />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3 checkout-inputs-row" controlId="formBasicEmail">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">State:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingState" name="billingState" placeholder="State" value={values.billingState} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Zip Code:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingZip" name="billingZip" placeholder="Zip Code" value={values.billingZip} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Credit Card Number:</Form.Label>
            <Form.Control className="checkout-input" type="password" data-testid="billingCreditCardNum" name="billingCreditCardNum" placeholder="Credit Card Number" value={values.billingCreditCardNum} onChange={handleChange} />
          </Form.Group>
        </Form.Group>
        
      </Form.Group>
    </Form>
  );
}