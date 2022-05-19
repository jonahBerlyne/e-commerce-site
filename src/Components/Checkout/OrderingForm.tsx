import "../../Styles/CheckoutForm.css";

interface Order {
 values: any;
 items: any[];
 subTotal: number;
};

export default function OrderingForm({ values, items, subTotal }: Order) {
 return (
  <div>
   <h2>Your order:</h2>
   <h3>Billing Info:</h3>
   <h4>Name:</h4>
   <h5>{values.billingFirstName} {values.billingLastName}</h5>
   <h4>Phone:</h4>
   <h5>{values.billingPhone}</h5>
   <h4>E-mail Address:</h4>
   <h5>{values.billingEmail}</h5>
   <h4>Billing Address:</h4>
   <h5>{values.billingAddress}</h5>
   <h5>{values.billingCity}, {values.billingState} {values.billingZip}</h5>
   <h4>Credit Card Number:</h4>
   <h5>{values.billingCreditCardNum}</h5> {/* Come back to this */}
   <h3>Shipping Info:</h3>
   <h4>Name:</h4>
   <h5>{values.shippingFirstName} {values.shippingLastName}</h5>
   <h4>Phone:</h4>
   <h5>{values.shippingPhone}</h5>
   <h4>E-mail Address:</h4>
   <h5>{values.shippingEmail}</h5>
   <h4>Shipping Address:</h4>
   <h5>{values.shippingAddress}</h5>
   <h5>{values.shippingCity}, {values.shippingState} {values.shippingZip}</h5>
   <h3>Your total:</h3>
   {items.map(item => {
    return (
     <div key={item.id} style={{display: "flex", gap: "5px"}}>
      <h4>{item.title}</h4>
      <img src={item.image} alt={item.title} height="100px" width="100px"/>
      <h5>x{item.quantity}</h5>
      <h4>{parseFloat(item.total).toFixed(2)}</h4>
     </div>
    );
   })}
   <h4>Subtotal: {subTotal}</h4>
   <h5>Sales Tax (6.25%): {(subTotal * 0.0625).toFixed(2)}</h5>
   <h5>Shipping Fee: 3.00</h5>
   <h2>Your total: ${(subTotal + (subTotal * 0.0625) + 3).toFixed(2)}</h2>
  </div>
 );
}