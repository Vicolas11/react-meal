import React, { useState, Fragment, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import MainHeader from "./components/MainHeader";
import Body from "./components/Body";
import "./components/style.css";
import Modal from "./components/Modal";
import CartContext from "./store/context";

function App() {
  const cartContext = useContext(CartContext);
  
  return (
    <Fragment>
      {cartContext.showModal &&
        ReactDOM.createPortal(<Modal />, document.getElementById("modal-here"))}
      <MainHeader />
      <Body />
    </Fragment>
  );
}

export default App;
