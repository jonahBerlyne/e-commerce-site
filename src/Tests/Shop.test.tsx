import React from 'react';
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ShoppingPage from '../Pages/ShoppingPage';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

afterEach(cleanup);

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
});