import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);

export default app;