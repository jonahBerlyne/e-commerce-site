import NavBar from "./NavBar";
import store from "../store";

export default function Shop() {

 function getState() {

  const state = store.getState();
  console.log("state is " + state + " and the shop length is " + state.length);
 }
  return (
    <div className="App">
      <NavBar/>
      <h1>Shop Page</h1>
      <button onClick={getState}>Get State</button>
    </div>
  );
}