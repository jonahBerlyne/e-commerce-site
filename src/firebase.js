import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7Nq0NhcXzQHsZvF5Y-3WcYSmqjSiYzSo",
  authDomain: "e-commerce-site-6836a.firebaseapp.com",
  projectId: "e-commerce-site-6836a",
  storageBucket: "e-commerce-site-6836a.appspot.com",
  messagingSenderId: "926072447686",
  appId: "1:926072447686:web:61ddc085a8188bc1662dc7"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;