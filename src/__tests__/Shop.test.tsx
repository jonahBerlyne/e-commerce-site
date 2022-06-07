import React, { MouseEventHandler } from 'react';
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
import itemData from '../Data/ItemData';

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

});

describe("Cart Component", () => {

 let cartItems: any[] = [];
 
 const addToCart = (id: number): void => {
  const [cartItem] = cartItems.filter(item => item.id === id);
  let itemDoc = {};
  if (cartItem) {
    itemDoc = {
      ...cartItem,
      "quantity": cartItem.quantity + 1,
      "total": cartItem.total + cartItem.price
    };
    cartItems.filter(item => item.id !== id);
  } else {
    const item = itemData[id - 1];
    itemDoc = {
      "id": item.id,
      "image": item.image,
      "price": item.price,
      "quantity": 1,
      "title": item.title,
      "total": item.price
    };
  }
  cartItems.push(itemDoc);
 };

 const handleItem = (action: string, id: number): void => {
  if (action === "removeItem") {
    cartItems = cartItems.filter(item => item.id !== id);
  } else {
    const [cartItem] = cartItems.filter(item => item.id === id);
    let itemDoc = {};
    if (action === "decreaseItem") {
      if (cartItem.quantity === 1) return;
      itemDoc = {
        ...cartItem,
        "quantity": cartItem.quantity - 1,
        "total": cartItem.total - cartItem.price
      };
    }
    if (action === "increaseItem") {
      itemDoc = {
        ...cartItem,
        "quantity": cartItem.quantity + 1,
        "total": cartItem.total + cartItem.price
      };
    }
    cartItems = cartItems.filter(item => item.id !== id);
    cartItems.push(itemDoc);
  }
 };
  
 afterEach(() => {
  jest.resetAllMocks();
 });

 it("renders the cart component", async () => {
   const mockStore = configureMockStore([thunk]);

   const store = mockStore({
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

 it("adds an item to the cart", () => {

  const ShoppingItems = () => {
    return (
      <div>
        {itemData.map(item => {
          return (
            <div key={item.id}>
              <button data-testid={item.id} onClick={() => addToCart(item.id)}></button>
            </div>
          );
        })}
      </div>
    );
  }

  render(<ShoppingItems />);

  const addBtn = screen.getByTestId(20);
  fireEvent.click(addBtn);
  const [cartItem] = cartItems;

  expect(cartItems).toHaveLength(1);
  expect(cartItem.title).toEqual("Tweety Bird Pez Dispenser");
 });

 it("changes the item's quantity", async () => {

   const CartItems = () => {
    return (
      <div>
        {cartItems.map(item => {
          return (
            <div key={item.id}>
              <button data-testid={`decrease_${item.id}`} onClick={() => handleItem("decreaseItem", item.id)}>-</button>
              <button data-testid={`increase_${item.id}`} onClick={() => handleItem("increaseItem", item.id)}>+</button>
            </div>
          );
        })}
      </div>
    );
   }
   
   render(<CartItems />);

   const increaseItem20 = screen.getByTestId("increase_20");
   fireEvent.click(increaseItem20);
   let [cartItem] = cartItems;
   expect(cartItem.quantity).toEqual(2);

   const decreaseItem20 = screen.getByTestId("decrease_20");
   fireEvent.click(decreaseItem20);
   [cartItem] = cartItems;
   expect(cartItem.quantity).toEqual(1);

   fireEvent.click(decreaseItem20);
   expect(cartItem.quantity).toEqual(1);
   expect(screen.queryByTestId("increase_19")).toBeNull();
 });

 it("deletes the item from the cart", () => {

  const CartItems = () => {
    return (
      <div>
        {cartItems.map(item => {
          return (
            <div key={item.id}>
              <button data-testid={`remove_${item.id}`} onClick={() => handleItem("removeItem", item.id)}></button>
            </div>
          );
        })}
      </div>
    );
   }
   
   render(<CartItems />);

   const removeItem20 = screen.getByTestId("remove_20");
   fireEvent.click(removeItem20);
   const [cartItem] = cartItems.filter(item => item.id === 20);
   expect(cartItem).toBeFalsy();

   expect(screen.queryByTestId("remove_19")).toBeNull();
 });

});