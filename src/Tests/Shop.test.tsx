import React from 'react';
import { render, screen, cleanup, waitFor, within, fireEvent } from "@testing-library/react";
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
import { auth } from '../firebaseConfig';

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock('firebase/auth');

afterEach(cleanup);

afterAll(done => {
  done();
});

describe("Shopping Page", () => {

 afterEach(() => {
  jest.resetAllMocks();
 });

 const getLoggedInUser = async () => {
      const mockAuth = ({
      signInWithEmailAndPassword: jest.fn(),
      } as unknown) as Auth;

      (getAuth as jest.MockedFunction<typeof getAuth>).mockReturnValue(mockAuth);

      const email = "example@gmail.com";
      const password = "example";
      await signInWithEmailAndPassword(getAuth(), email, password);

      (getAuth as jest.Mocked<any>).mockReturnValueOnce({
          currentUser: { email: 'example@gmail.com', uid: 1 }
      });

      const currentUser = getAuth().currentUser;

      if (currentUser) {
        return {
          email: currentUser.email,
          uid: currentUser.uid
        };
      } else {
        return undefined;
      }
 }

 const renderItems = () => {
  render(
   <Provider store={store}>
    <Router>
      <ShoppingPage />
    </Router>
   </Provider>
  );

  return {
    getItems() {
      return screen
            .getAllByTestId('item')
            .map((item, index) => ({
              title: within(item)
                     .getByTestId("item-title")
                     .textContent,
              addBtn: <AddToCart id={index} />
            }));
    }
  };
 }

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
   await getLoggedInUser();
   const {container} = render(
    <Provider store={store}>
      <Router>
        <Cart />
      </Router>
    </Provider>
   );
  expect(container).toMatchSnapshot();
 });

});