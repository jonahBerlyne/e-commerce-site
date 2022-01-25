import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from "react-redux";

const AppWrapper = ({ children }) => {
  return (
    <Provider store={store}>{children}</Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);