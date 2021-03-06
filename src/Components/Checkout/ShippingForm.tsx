import React from 'react';
import { InputForm } from '../../Pages/CheckoutPage';
import { Form } from "react-bootstrap";

export default function ShippingForm({ values, handleChange }: InputForm) {
  return (
    <Form className="checkout-form">
      <Form.Label className="checkout-form-header">Shipping:</Form.Label>
      <Form.Group className='mb-3 checkout-inputs-container'>

        <Form.Group className="mb-3 checkout-inputs-row">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">First Name:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="shippingFirstName" name="shippingFirstName" placeholder="First Name" value={values.shippingFirstName} onChange={handleChange} maxLength={23} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Last Name:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="shippingLastName" name="shippingLastName" placeholder="Last Name" value={values.shippingLastName} onChange={handleChange} maxLength={23} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Phone Number:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="shippingPhone" name="shippingPhone" placeholder="Phone Number" value={values.shippingPhone} onChange={handleChange} maxLength={15} />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3 checkout-inputs-row">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">E-mail Address:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="shippingEmail" name="shippingEmail" placeholder="E-mail Address" value={values.shippingEmail} onChange={handleChange} maxLength={30} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Address:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="shippingAddress" name="shippingAddress" placeholder="Address" value={values.shippingAddress} onChange={handleChange} maxLength={30} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">City:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="shippingCity" name="shippingCity" placeholder="City" value={values.shippingCity} onChange={handleChange} maxLength={25} />
          </Form.Group>
        </Form.Group>

        <Form.Group className="mb-3 checkout-inputs-row">
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">State:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="shippingState" name="shippingState" placeholder="State" value={values.shippingState} onChange={handleChange} maxLength={2} />
          </Form.Group>
          <Form.Group className="mb-3 checkout-form-input">
            <Form.Label className="checkout-form-input-label">Zip Code:</Form.Label>
            <Form.Control className="checkout-input" type="text" data-testid="shippingZip" name="shippingZip" placeholder="Zip Code" value={values.shippingZip} onChange={handleChange} maxLength={5} />
          </Form.Group>
        </Form.Group>
      </Form.Group>
    </Form>
  );
}