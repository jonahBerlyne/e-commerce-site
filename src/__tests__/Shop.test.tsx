import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ShoppingPage from '../Pages/ShoppingPage';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";
import Cart from '../Components/Cart';
import { Auth, getAuth } from 'firebase/auth';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import itemData from '../Data/ItemData';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

describe("Shopping Page", () => {

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

 it("adds an item to the cart", async () => {
  const mockAuth = ({
    currentUser: {
      uid: "abc"
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockResolvedValue(mockAuth);
  (doc as jest.Mock).mockReturnThis();
  (getDoc as jest.Mock).mockResolvedValue(null);
  (setDoc as jest.Mock).mockResolvedValue(this);

  render(
   <Provider store={store}>
    <Router>
      <ShoppingPage />
    </Router>
   </Provider>
  );

  fireEvent.click(screen.getByTestId("addItem20ToCart"));

  await waitFor(() => {
    expect(getDoc).toBeCalled();
  });

  await waitFor(() => {
    expect(setDoc).toBeCalled();
  });
 });

});

describe("Cart Component", () => {

 let cartItems: any[] = [
    {
        "id": 7,
        "image": "item7.png",
        "price": 2.00,
        "quantity": 5,
        "title": "Item 7",
        "total": 10.00
    },
    {
        "id": 20,
        "image": "item20.png",
        "price": 3.00,
        "quantity": 1,
        "title": "Item 20",
        "total": 3.00
    }
 ];

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
        uid: "abc",
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
   expect(cartItems[1].quantity).toEqual(2);

   const decreaseItem20 = screen.getByTestId("decrease_20");
   fireEvent.click(decreaseItem20);
   expect(cartItems[1].quantity).toEqual(1);

   fireEvent.click(decreaseItem20);
   expect(cartItems[1].quantity).toEqual(1);

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