import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../Pages/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["testAppId"],
    auth: jest.fn(),
    firestore: jest.fn(),
  };
});

afterEach(cleanup);

describe("Login Page", () => {

 it("renders", () => {
  const { container } = render(
   <Router>
    <LoginPage />
   </Router>
  );
  expect(container).toMatchSnapshot();
 });

});