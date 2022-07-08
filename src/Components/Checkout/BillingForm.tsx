import React from 'react';
import { InputForm } from '../../Pages/CheckoutPage';
import { Form } from "react-bootstrap";

export default function BillingForm({ values, handleChange }: InputForm) {
  return (
    <Form className="checkout-form">
      <Form.Label className="checkout-form-header">Billing:</Form.Label>
      <Form.Group className='mb-3 checkout-inputs-container'>

        <Form.Group className="mb-3 checkout-inputs-row">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">First Name:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingFirstName" name="billingFirstName" placeholder="First Name" value={values.billingFirstName} onChange={handleChange} maxLength={23} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Last Name:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingLastName" name="billingLastName" placeholder="Last Name" value={values.billingLastName} onChange={handleChange} maxLength={23} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Phone Number:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingPhone" name="billingPhone" placeholder="Phone Number" value={values.billingPhone} onChange={handleChange} maxLength={15} />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3 checkout-inputs-row">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">E-mail Address:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingEmail" name="billingEmail" placeholder="E-mail Address" value={values.billingEmail} onChange={handleChange} maxLength={30} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Address:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingAddress" name="billingAddress" placeholder="Address" value={values.billingAddress} onChange={handleChange} maxLength={30} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">City:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingCity" name="billingCity" placeholder="City" value={values.billingCity} onChange={handleChange} maxLength={25} />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3 checkout-inputs-row">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">State:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingState" name="billingState" placeholder="State" value={values.billingState} onChange={handleChange} maxLength={2} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Zip Code:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="billingZip" name="billingZip" placeholder="Zip Code" value={values.billingZip} onChange={handleChange} maxLength={5} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Credit Card Number:</Form.Label>
            <Form.Control className="checkout-input" type="password" data-testid="billingCreditCardNum" name="billingCreditCardNum" placeholder="Credit Card Number" value={values.billingCreditCardNum} onChange={handleChange} maxLength={16} />
          </Form.Group>
        </Form.Group>
        
      </Form.Group>
    </Form>
  );
}