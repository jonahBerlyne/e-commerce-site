import NavBar from "./NavBar";
// import store from "../store";
// import { bugAdded } from "../Actions";

export default function Home() {

  // function addState() {
  //   store.dispatch(bugAdded("Bug 1"));
  //   console.log(store.getState());
  // }
  return (
    <div className="App">
      <NavBar/>
      <h1>Home Page</h1>
      {/* <button onClick={addState}>Add to State</button> */}
    </div>
  );
}
