import NavBar from "./NavBar";
import store from "../store";

export default function Cart() {

  const state = store.getState();
  console.log(state[0]);


//  function getState() {

//   const state = store.getState();
//   console.log("state is " + state + " and the cart length is " + state.length);
//  }
  return (
    <div className="App">
      <NavBar/>
      <h1>Cart Page</h1>
      {state.map(item => {
        return (
          <div>
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.image} height="100px" width="100px"/>
            <br/>
            <br/>
            <input type="number" value={item.quantity}></input>
            <h4>Price: ${item.price.toFixed(2)}</h4>
          </div>
        );
      })}
      <h2>Total Price: ${state.reduce((a, b) => a.price + b.price).toFixed(2)}</h2>
      {/* <button onClick={getState}>Get State</button> */}
    </div>
  );
}