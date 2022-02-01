import NavBar from "./NavBar";
import app from "../firebase";

export default function Home() {

  const ref = app.firestore().collection("demo");
  console.log(ref);

  return (
    <div className="App">
      <NavBar/>
      <h1>Home Page</h1>
    </div>
  );
}
