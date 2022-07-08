import React from "react";
import { render, screen, cleanup, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import OrdersPage from "../Pages/OrdersPage";
import { Auth, getAuth } from "firebase/auth";
import BillingForm from "../Components/Checkout/BillingForm";
import ShippingForm from "../Components/Checkout/ShippingForm";
import OrderingForm from "../Components/Checkout/OrderingForm";
import userEvent from "@testing-library/user-event";
import itemData from "../Data/ItemData";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import CheckoutPage from "../Pages/CheckoutPage";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";

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

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

const orderValues = { id: "example", billingFirstName: 'Jerry', billingLastName: 'Seinfeld', billingPhone: '1234567890', billingEmail: 'jerry@seinfeld.com', billingAddress: '100 Park Ave. Apt. 5A', billingCity: 'New York', billingState: 'NY', billingZip: '10001', billingCreditCardNum: '1234123412345678', shippingFirstName: 'George', shippingLastName: 'Costanza', shippingPhone: '0987654321', shippingEmail: 'george@costanza.com', shippingAddress: '100 Queens Ave. Apt. 5C', shippingCity: 'Queens', shippingState: 'NY', shippingZip: '11426' };

const item11 = {
  ...itemData[11], 
  quantity: 2, 
  total: "5.98"
};
const item19 = {
  ...itemData[19],
  quantity: 1, 
  total: "3.99"
};

const items = [item11, item19];
const numItems = 2;
const subTotal = 6.98;

describe("Checkout Page", () => {

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

 it("orders the items", async () => {
  const mockStore = configureMockStore([thunk]);

  const store = mockStore({
      cart: {
        cart: true
      }
  });

  const mockAuth = ({
    currentUser: {
      uid: "abc"
    }
  } as unknown) as Auth;
  (query as jest.Mock).mockReturnThis();
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (orderBy as jest.Mock).mockReturnThis();

  (getDocs as jest.Mock).mockResolvedValue([
   {
    data: () => ({
        "id": 7,
        "image": "item7.png",
        "price": 2.00,
        "quantity": 5,
        "title": "Item 7",
        "total": 10.00
    })
   },
   {
    data: () => ({
        "id": 20,
        "image": "item20.png",
        "price": 3.00,
        "quantity": 1,
        "title": "Item 20",
        "total": 3.00
    })
   }
  ]);

  (serverTimestamp as jest.Mock).mockReturnThis();
  (collection as jest.Mock).mockReturnThis();
  (addDoc as jest.Mock).mockResolvedValue(this);
  (doc as jest.Mock).mockReturnThis();
  (deleteDoc as jest.Mock).mockResolvedValue(this);

  render(
    <Provider store={store}>
      <Router>
        <CheckoutPage />
      </Router>
    </Provider>
  );

  const promise = Promise.resolve();
  await act(async () => {
    await promise;
  });

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

  fireEvent.click(screen.getByTestId("goToShippingBtn"));

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

  fireEvent.click(screen.getByTestId("goToOrderingBtn"));

  const jsdom = window.alert;
  window.alert = () => {};

  fireEvent.click(screen.getByTestId("placeOrderBtn"));

  await waitFor(() => {
    expect(addDoc).toBeCalled();
  });

  await waitFor(() => {
    expect(deleteDoc).toBeCalledTimes(2);
  });

  window.alert = jsdom;
 });
});

describe("Orders Page", () => {

 it("renders the orders page", async () => {
  const mockAuth = ({
    currentUser: {
        uid: "abc",
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

 it("displays the orders", async () => {

  const mockAuth = ({
    currentUser: {
        uid: "abc",
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (orderBy as jest.Mock).mockReturnThis();
  (collection as jest.Mock).mockReturnThis();
  (query as jest.Mock).mockReturnThis();

  const secondOrder = [{
    ...items[0],
    quantity: 1,
    total: 2.99
  }];

  const mockData = ([
    {
      data: () => ({
        itemsOrdered: secondOrder,
        orderInfo: orderValues,
        timestamp: 1648423100000,
        total: 5.99
      })
    },
    {
     data: () => ({
         itemsOrdered: items,
         orderInfo: orderValues,
         timestamp: 1648052300000,
         total: 8.98
     })
    }
  ]);
  (getDocs as jest.Mock).mockResolvedValue(mockData);

  render(
   <Router>
    <OrdersPage />
   </Router>
  );

  const promise = Promise.resolve();
  await act(async () => {
   await promise;
  });

  await waitFor(() => {
    expect(getDocs).toBeCalled();
  });

  expect(screen.getByTestId("order1Header")).toHaveTextContent("Order #1:");
  expect(screen.getByTestId("order2Header")).toHaveTextContent("Order #2:");
  expect(screen.getByTestId("itemTitle12-1")).toHaveTextContent("Mackinaw Peaches");
  expect(screen.getByTestId("itemTitle20-1")).toHaveTextContent("Tweety Bird Pez Dispenser");
  expect(screen.getByTestId("itemImage12-1")).toHaveAttribute("src", "/Images/Mackinaw_Peaches.jpeg");
  expect(screen.getByTestId("itemImage20-1")).toHaveAttribute("src", "/Images/Pez_Dispenser.jpeg");
  expect(screen.getByTestId("itemQuantity12-1")).toHaveTextContent("x2");
  expect(screen.getByTestId("itemQuantity20-1")).toHaveTextContent("x1");
  expect(screen.getByTestId("itemQuantity12-2")).toHaveTextContent("x1");
  expect(screen.getByTestId("itemPrice12-1")).toHaveTextContent("2.99");
  expect(screen.getByTestId("itemPrice20-1")).toHaveTextContent("3.99");
  expect(screen.getByTestId("order1Total")).toHaveTextContent("Total (After Tax): $8.98");
  expect(screen.getByTestId("order2Total")).toHaveTextContent("Total (After Tax): $5.99");
  
 });
});