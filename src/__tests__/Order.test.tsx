import React from "react";
import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import OrdersPage from "../Pages/OrdersPage";
import { Auth, getAuth } from "firebase/auth";
import BillingForm from "../Components/Checkout/BillingForm";
import ShippingForm from "../Components/Checkout/ShippingForm";
import OrderingForm from "../Components/Checkout/OrderingForm";
import userEvent from "@testing-library/user-event";
import itemData from "../Data/ItemData";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"],
  };
});

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn()
  };
});

jest.mock('firebase/firestore');

afterEach(cleanup);

let orders: any[] = [];

afterAll(done => {
  orders = [];
  done();
});

describe("Checkout Page", () => {

 afterEach(() => {
  jest.resetAllMocks();
 });

 const values = jest.mock;
 const handleChange = jest.fn();
 const inputProps = { values, handleChange };

 it("renders the billing form", () => {

  const { container } = render(
    <Router>
      <BillingForm {...inputProps} />
    </Router>
  );

  expect(container).toMatchSnapshot();
 });

 it("changes the billing forms values", () => {

   render(
     <Router>
       <BillingForm {...inputProps} />
     </Router>
   );

   const billingFirstName = screen.getByTestId("billingFirstName");
   const billingLastName = screen.getByTestId("billingLastName");
   const billingPhone = screen.getByTestId("billingPhone");
   const billingEmail = screen.getByTestId("billingEmail");
   const billingAddress = screen.getByTestId("billingAddress");
   const billingCity = screen.getByTestId("billingCity");
   const billingState = screen.getByTestId("billingState");
   const billingZip = screen.getByTestId("billingZip");
   const billingCreditCardNum = screen.getByTestId("billingCreditCardNum");

   userEvent.type(billingFirstName, "Jerry");
   userEvent.type(billingLastName, "Seinfeld");
   userEvent.type(billingPhone, "1234567890");
   userEvent.type(billingEmail, "jerry@seinfeld.com");
   userEvent.type(billingAddress, "100 Park Ave. Apt. 5A");
   userEvent.type(billingCity, "New York");
   userEvent.type(billingState, "NY");
   userEvent.type(billingZip, "10001");
   userEvent.type(billingCreditCardNum, "1234123412345678");
   
   expect(billingFirstName).toHaveValue("Jerry");
   expect(billingLastName).toHaveValue("Seinfeld");
   expect(billingPhone).toHaveValue("1234567890");
   expect(billingEmail).toHaveValue("jerry@seinfeld.com");
   expect(billingAddress).toHaveValue("100 Park Ave. Apt. 5A");
   expect(billingCity).toHaveValue("New York");
   expect(billingState).toHaveValue("NY");
   expect(billingZip).toHaveValue("10001");
   expect(billingCreditCardNum).toHaveValue("1234123412345678");
 });

 it("renders the shipping form", () => {

  const { container } = render(
    <Router>
      <ShippingForm {...inputProps} />
    </Router>
  );

  expect(container).toMatchSnapshot();
 });

 it("changes the shipping forms values", () => {

   render(
     <Router>
       <ShippingForm {...inputProps} />
     </Router>
   );

   const shippingFirstName = screen.getByTestId("shippingFirstName");
   const shippingLastName = screen.getByTestId("shippingLastName");
   const shippingPhone = screen.getByTestId("shippingPhone");
   const shippingEmail = screen.getByTestId("shippingEmail");
   const shippingAddress = screen.getByTestId("shippingAddress");
   const shippingCity = screen.getByTestId("shippingCity");
   const shippingState = screen.getByTestId("shippingState");
   const shippingZip = screen.getByTestId("shippingZip");

   userEvent.type(shippingFirstName, "George");
   userEvent.type(shippingLastName, "Costanza");
   userEvent.type(shippingPhone, "0987654321");
   userEvent.type(shippingEmail, "george@costanza.com");
   userEvent.type(shippingAddress, "100 Queens Ave Apt. 5C");
   userEvent.type(shippingCity, "Queens");
   userEvent.type(shippingState, "NY");
   userEvent.type(shippingZip, "11426");
   
   expect(shippingFirstName).toHaveValue("George");
   expect(shippingLastName).toHaveValue("Costanza");
   expect(shippingPhone).toHaveValue("0987654321");
   expect(shippingEmail).toHaveValue("george@costanza.com");
   expect(shippingAddress).toHaveValue("100 Queens Ave Apt. 5C");
   expect(shippingCity).toHaveValue("Queens");
   expect(shippingState).toHaveValue("NY");
   expect(shippingZip).toHaveValue("11426");
 });

 const orderValues = { id: "example", billingFirstName: 'Jerry', billingLastName: 'Seinfeld', billingPhone: '1234567890', billingEmail: 'jerry@seinfeld.com', billingAddress: '100 Park Ave. Apt. 5A', billingCity: 'New York', billingState: 'NY', billingZip: '10001', billingCreditCardNum: '1234123412345678', shippingFirstName: 'George', shippingLastName: 'Costanza', shippingPhone: '0987654321', shippingEmail: 'george@costanza.com', shippingAddress: '100 Queens Ave. Apt. 5C', shippingCity: 'Queens', shippingState: 'NY', shippingZip: '11426' };

 const item11 = {...itemData[11], total: "2.99"};
 const item19 = {...itemData[19], total: "3.99"};

 const items = [item11, item19];
 const numItems = 2;
 const subTotal = 6.98;

 it("renders the ordering form", () => {

  const { container } = render(
    <Router>
      <OrderingForm 
        values={orderValues}
        items={items}
        numItems={numItems}
        subTotal={subTotal}
      />
    </Router>
  );

  expect(container).toMatchSnapshot();
 });

 it("checks the ordering form's text", () => {
   render(
    <Router>
      <OrderingForm 
        values={orderValues}
        items={items}
        numItems={numItems}
        subTotal={subTotal}
      />
    </Router>
  );

  const subTotalText = screen.getByTestId("subTotalText");
  const salesTaxText = screen.getByTestId("salesTaxText");
  const totalText = screen.getByTestId("totalText");
  const numItemsLabel = screen.getByTestId("numItemsLabel");
  const shippingNameText = screen.getByTestId("shippingNameText");
  const creditCardNumText = screen.getByTestId("creditCardNumText");

  expect(subTotalText).toHaveTextContent("$6.98");
  expect(salesTaxText).toHaveTextContent("$0.44");
  expect(totalText).toHaveTextContent("$10.42");
  expect(numItemsLabel).toHaveTextContent("2 Items in Cart");
  expect(shippingNameText).toHaveTextContent("George Costanza");
  expect(creditCardNumText).toHaveTextContent(/^xxxxxxxxxxxx5678$/);
 });

 it("orders the items", () => {

   const placeOrder = (): void => {
     const orderDoc = {
       "itemsOrdered": items,
       "orderInfo": orderValues,
       "timestamp": "June 08, 2022",
       "total": "10.42",
     };
     orders.push(orderDoc);
   }

   const Order = () => {
     return (
      <>
        <button data-testid="orderBtn" onClick={() => placeOrder()}></button>
      </>
     );
   }

   render(<Order />);

   const orderBtn = screen.getByTestId("orderBtn");
   fireEvent.click(orderBtn);

   expect(orders).toHaveLength(1);
 });
});


describe("Orders Page", () => {

 afterEach(() => {
  jest.resetAllMocks();
 });

 it("renders the orders page", async () => {
  const mockAuth = ({
    currentUser: {
        uid: jest.fn().mockReturnValue("abc"),
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);

  const { container } = render(
   <Router>
    <OrdersPage />
   </Router>
  );

  const promise = Promise.resolve();
  await act(async () => {
   await promise;
  });

  expect(container).toMatchSnapshot();
 });

 it("displays the orders", () => {

   const Orders = () => {
     return (
       <div>
         {orders.map(order => {
          return (
            <div key={order.timestamp}>
             <h2 data-testid="orderTimestamp">Items ordered on {order.timestamp}:</h2>
             {order.itemsOrdered.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <h3 data-testid={`item${item.id}Title`}>{item.title}</h3>
                      <img src={item.image} alt={item.title} className="ordered-item-img" />
                      <h5>x{item.quantity}</h5>
                      <h3>{item.price}</h3>
                    </div>
                  )
             })}
             <h2 data-testid="orderTotal">Total (After Tax): ${order.total}</h2>
            </div>
          )
        })}
       </div>
     );
   }

   render(<Orders />);

   const orderTimestamp = screen.getByTestId("orderTimestamp");
   const item12Title = screen.getByTestId("item12Title");
   const item20Title = screen.getByTestId("item20Title");
   const orderTotal = screen.getByTestId("orderTotal");

   expect(orderTimestamp).toHaveTextContent(/^Items ordered on June 08, 2022:$/);
   expect(item12Title).toHaveTextContent("Mackinaw Peaches");
   expect(item20Title).toHaveTextContent("Tweety Bird Pez Dispenser");
   expect(orderTotal).toHaveTextContent("Total (After Tax): $10.42");
 });
});