import React from 'react';
import { render, screen, cleanup, waitFor, within, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ShoppingPage from '../Pages/ShoppingPage';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";
import AddToCart from '../Components/AddToCart';
import Cart from '../Components/Cart';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { mockFirebase } from 'firestore-jest-mock';
import fireDB, { auth } from '../firebaseConfig';
import AppRoute from '../Routes/AppRoute';
import * as redux from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { openCart } from '../Redux/Slices/cartSlice';
import renderer from 'react-test-renderer';
import { configureStore } from '@reduxjs/toolkit';
import OrdersPage from "../Pages/OrdersPage";
import CheckoutPage from "../Pages/CheckoutPage";
import { doc, getFirestore, setDoc } from 'firebase/firestore';

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

afterAll(done => {
  done();
});

describe("Shopping Page", () => {

  // mockFirebase({
  //   database: {
  //     users: [
  //       {
  //         id: 'abc',
  //         email: 'example@example.com',
  //         name: 'example',
  //         password: 'example',
  //         _collections: {
  //           items: [
  //             {
  //               id: '20',
  //               image: '/Images/Pez_Dispenser',
  //               price: 3.99,
  //               quantity: 1,
  //               title: 'Tweety Bird Pez Dispenser',
  //               total: 3.99
  //             },
  //           ],
  //         },
  //       },
  //     ]
  //   }
  // });
  
 afterEach(() => {
  jest.resetAllMocks();
 });


 it("renders the shopping page", () => {
  const { container } = render(
   <Provider store={store}>
    <Router>
      <ShoppingPage />
    </Router>
   </Provider>
  );
  expect(container).toMatchSnapshot();
 });

 it("renders the items", async () => {
  render(
   <Provider store={store}>
    <Router>
      <ShoppingPage />
    </Router>
   </Provider>
  );

  const items = await screen.findByTestId("items");
  expect(items).toBeInTheDocument();
 });

 it("filters the items", async () => {
  render(
   <Provider store={store}>
    <Router>
      <ShoppingPage />
    </Router>
   </Provider>
  );

  fireEvent.change(screen.getByTestId("Search"), {target: {value: "Books"}});

  expect(await screen.findAllByTestId("item")).toHaveLength(2);
 });

 it("renders the cart", async () => {
   let store;

   const mockStore = configureMockStore([thunk]);

   store = mockStore({
      cart: {
        cartIsOpen: true
      },
      user: {
        email: "example@example.com",
        name: "example",
        password: "example",
        id: "f85niu5f"
      }
   });

   const mockAuth = ({
    currentUser: {
        uid: jest.fn().mockReturnValue("abc"),
    }
   } as unknown) as Auth;
   (getAuth as jest.Mock).mockReturnValue(mockAuth);
   
   const {container} = render(
    <Provider store={store}> 
      <Router>
        <Cart />
      </Router>
    </Provider>
   );
   expect(container).toMatchSnapshot();
   expect(screen.getByTestId("cart-title")).toHaveTextContent("Cart");
 });

 it("adds an item to the cart", async () => {
   const mockAuth = ({
    currentUser: {
        uid: jest.fn().mockReturnValue("abc"),
    }
   } as unknown) as Auth;
   (getAuth as jest.Mock).mockReturnValue(mockAuth);

   const mockStore = configureMockStore([thunk]);

   const store = mockStore({
      cart: {
        cartIsOpen: true
      },
      user: {
        email: "example@example.com",
        name: "example",
        password: "example",
        id: "abc"
      }
   });

   render(
    <Provider store={store}> 
      <Router>
        <AddToCart id={20} />
        <Cart />
      </Router>
    </Provider>
   );
   userEvent.click(screen.getByTestId('addToCartBtn'));
   await waitFor(() => {
     expect(screen.getByTestId('cart-item-title')).toBeInTheDocument();
   });
 });

});