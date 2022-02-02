import React from 'react';
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import uniqid from "uniqid";

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export const addItemToFirebase = (item, id) => {
 database.ref(`/${id}`).set({
  item, id
 })
}

export const removeItemFromFirebase = id => {
  database.ref(`/${id}`).remove()
}

export default database;