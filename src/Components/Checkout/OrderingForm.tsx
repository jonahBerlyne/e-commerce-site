import { Form } from "react-bootstrap";
import "../../Styles/CheckoutForm.css";

interface Order {
 values: any;
 items: any[];
 subTotal: number;
};

export default function OrderingForm({ values, items, subTotal }: Order) {
 return (
  <Form>
   <Form.Label className="checkout-form-header">Order Summary</Form.Label>
   <Form.Group className="mb-3 checkout-form-info">
    <Form.Group className="checkout-form-costs">
     <Form.Label className="checkout-form-cost-label">Cart Subtotal:</Form.Label>
     <Form.Text className="checkout-form-cost">${subTotal.toFixed(2)}</Form.Text>
    </Form.Group>
    <Form.Group className="checkout-form-costs">
     <Form.Label className="checkout-form-cost-label">Sales Tax (6.25%):</Form.Label>
     <Form.Text className="checkout-form-cost">${(subTotal * 0.0625).toFixed(2)}</Form.Text>
    </Form.Group>
    <Form.Group className="checkout-form-costs">
     <Form.Label className="checkout-form-cost-label">Shipping Fee:</Form.Label>
     <Form.Text className="checkout-form-cost">$3.00</Form.Text>
    </Form.Group>
    <Form.Group className="checkout-form-costs">
     <Form.Label className="checkout-form-cost-label">Your total:</Form.Label>
     <Form.Text className="checkout-form-cost">${(subTotal + (subTotal * 0.0625) + 3).toFixed(2)}</Form.Text>
    </Form.Group>
    {items.map(item => {
     return (
      <div key={item.id} style={{display: "flex", gap: "5px"}}>
       <img src={item.image} alt={item.title} height="100px" width="100px" />
       <div className="checkout-item-info">
        <h4>{item.title}</h4>
        <h5>Qty {item.quantity}</h5>
        <h4>{parseFloat(item.total).toFixed(2)}</h4>
       </div>
      </div>
     );
    })}
   </Form.Group>
   <Form.Group className="mb-3 checkout-form-info">
    <Form.Label className="checkout-form-info-container-label">Ship To:</Form.Label>
    <Form.Group className="checkout-form-info">
      <Form.Text>{values.shippingFirstName} {values.shippingLastName}</Form.Text>
      <Form.Text>{values.shippingAddress}</Form.Text>
      <Form.Text>{values.shippingCity}, {values.shippingState} {values.shippingZip}</Form.Text>
      <Form.Text>{values.shippingEmail}</Form.Text>
      <Form.Text>{values.shippingPhone}</Form.Text>
    </Form.Group>
   </Form.Group>
   <Form.Group className="mb-3 checkout-form-info-container">
    <Form.Label className="checkout-form-info-container-label">From:</Form.Label>
    <Form.Group className="checkout-form-info">
      <Form.Text>{values.billingFirstName} {values.billingLastName}</Form.Text>
      <Form.Text>{values.billingAddress}</Form.Text>
      <Form.Text>{values.billingCity}, {values.billingState} {values.billingZip}</Form.Text>
      <Form.Text>{values.billingEmail}</Form.Text>
      <Form.Text>{values.billingPhone}</Form.Text>
      <Form.Text>{values.billingCreditCardNum}</Form.Text> {/* Come back to this */}
    </Form.Group>
   </Form.Group>
  </Form>
 );
}