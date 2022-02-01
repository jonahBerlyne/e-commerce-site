import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./Redux/Store";
import { Provider } from "react-redux";
// import FirebaseProvider from './firebase/compat/firebase';

ReactDOM.render(
  // <FirebaseProvider></FirebaseProvider>
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);