import fireDB from '../firebaseConfig';
import { collection, query, getDocs} from "firebase/firestore";
import store from '../Redux/Store';
import { itemSet } from '../Redux/Actions';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function Home() {

  return (
    <div className="App">
      <h1>Welcome to the Seinfeld Store!</h1>
    </div>
  );
}
