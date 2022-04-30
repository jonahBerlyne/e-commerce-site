import fireDB from '../firebaseConfig';
import { collection, query, getDocs} from "firebase/firestore";
import store from '../Redux/Store';
import { itemSet } from '../Redux/Actions';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function Home() {
  const { user } = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveCartItems(user.uid);
  }, []);

  const retrieveCartItems = async (id: any): Promise<any> => {
    try {
      const q = query(collection(fireDB, "users", id, "items"));
      const querySnapshot = await getDocs(q);
      let itemsArr: any[] = [];
      querySnapshot.forEach(doc => {
        itemsArr.push(doc.data());
      });
      itemsArr.forEach(item => {
        dispatch(itemSet(item.id, item.title, item.image, item.price, item.quantity));
      });
      const cart = store.getState();
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      alert(`Error: ${err}`);
    }
  }

  return (
    <div className="App">
      <h1>Welcome to the Seinfeld Store!</h1>
    </div>
  );
}