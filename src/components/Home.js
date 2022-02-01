import NavBar from "./NavBar";
import firebase from "../firebase";

export default function Home() {

  const ref = firebase.firestore().collection("demo");
  console.log(ref);

  return (
    <div className="App">
      <NavBar/>
      <h1>Home Page</h1>
    </div>
  );
}
