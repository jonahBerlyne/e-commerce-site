import { Form } from "react-bootstrap";

interface Order {
 values: any;
 items: any[];
 numItems: number;
 subTotal: number;
};

export default function OrderingForm({ values, items, numItems, subTotal }: Order) {

 const xStr: string = "x";

 const creditCardNum: string = values.billingCreditCardNum.replaceAll(values.billingCreditCardNum.substring(0, values.billingCreditCardNum.length - 4), xStr.repeat(values.billingCreditCardNum.substring(0, values.billingCreditCardNum.length - 4).length));

 return (
  <Form className="checkout-receipt">
   <Form.Label className="checkout-form-header">Order Summary</Form.Label>
   <Form.Group className="mb-3 checkout-form-cost-info">
    <Form.Group className="checkout-form-costs">
     <Form.Label className="checkout-form-cost-label">Cart Subtotal:</Form.Label>
     <Form.Text data-testid="subTotalText" className="checkout-form-cost">${subTotal.toFixed(2)}</Form.Text>
    </Form.Group>
    <Form.Group className="checkout-form-costs">
     <Form.Label className="checkout-form-cost-label">Sales Tax (6.25%):</Form.Label>
     <Form.Text data-testid="salesTaxText" className="checkout-form-cost">${(subTotal * 0.0625).toFixed(2)}</Form.Text>
    </Form.Group>
    <Form.Group className="checkout-form-costs">
     <Form.Label className="checkout-form-cost-label">Shipping Fee:</Form.Label>
     <Form.Text className="checkout-form-cost">$3.00</Form.Text>
    </Form.Group>
    <div className="checkout-receipt-border"></div>
    <Form.Group className="checkout-form-costs">
     <Form.Label className="checkout-form-cost-label">Your total:</Form.Label>
     <Form.Text data-testid="totalText" className="checkout-form-cost">${(subTotal + (subTotal * 0.0625) + 3).toFixed(2)}</Form.Text>
    </Form.Group>
   </Form.Group>
   <br />
   <div className="checkout-receipt-border"></div>
   <Form.Group className="mb-3 checkout-items">
    <Form.Label data-testid="numItemsLabel" className="checkout-items-label">{numItems} Item{numItems > 1 && "s"} in Cart</Form.Label>
    {items.map(item => {
     return (
      <div key={item.id} className="checkout-item">
       <img src={item.image} alt={item.title} className="checkout-img" />
       <div className="checkout-item-info">
        <p style={{ fontSize: "15px" }}>{item.title}</p>
        <p style={{ fontSize: "12px" }}>Qty {item.quantity}</p>
        <p style={{ fontWeight: "700" }}>${parseFloat(item.total).toFixed(2)}</p>
       </div>
      </div>
     );
    })}
   </Form.Group>
   <br />
   <div className="checkout-receipt-border"></div>
   <Form.Group className="mb-3 checkout-form-info-container">
    <Form.Label className="checkout-form-info-container-label">Ship To:</Form.Label>
    <Form.Group className="checkout-form-info">
      <Form.Text data-testid="shippingNameText" className="checkout-form-info-piece">{values.shippingFirstName} {values.shippingLastName}</Form.Text>
      <Form.Text className="checkout-form-info-piece">{values.shippingAddress}</Form.Text>
      <Form.Text className="checkout-form-info-piece">{values.shippingCity}, {values.shippingState} {values.shippingZip}</Form.Text>
      <Form.Text className="checkout-form-info-piece">{values.shippingEmail}</Form.Text>
      <Form.Text className="checkout-form-info-piece">{values.shippingPhone}</Form.Text>
    </Form.Group>
   </Form.Group>
   <Form.Group className="mb-3 checkout-form-info-container">
    <Form.Label className="checkout-form-info-container-label">From:</Form.Label>
    <Form.Group className="checkout-form-info">
      <Form.Text className="checkout-form-info-piece">{values.billingFirstName} {values.billingLastName}</Form.Text>
      <Form.Text className="checkout-form-info-piece">{values.billingAddress}</Form.Text>
      <Form.Text className="checkout-form-info-piece">{values.billingCity}, {values.billingState} {values.billingZip}</Form.Text>
      <Form.Text className="checkout-form-info-piece">{values.billingEmail}</Form.Text>
      <Form.Text className="checkout-form-info-piece">{values.billingPhone}</Form.Text>
      <Form.Text data-testid="creditCardNumText" className="checkout-form-info-piece">{creditCardNum}</Form.Text>
    </Form.Group>
   </Form.Group>
   <div className="checkout-receipt-border"></div>
  </Form>
 );
}