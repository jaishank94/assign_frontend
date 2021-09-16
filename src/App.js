import React from "react";
import "./App.css";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/" component={Signup}></Route>
      </Router>

    </div>
  );
}

export default App;
