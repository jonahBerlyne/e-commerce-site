import React from "react";
import { render, screen, cleanup, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import OrdersPage from "../Pages/OrdersPage";
import { Auth, getAuth } from "firebase/auth";

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
});