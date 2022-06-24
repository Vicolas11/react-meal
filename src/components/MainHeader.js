import React from "react";
import { BsCartFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import CartContext from "../store/context";

const MainHeader = () => {
  const cartContext = useContext(CartContext);
  const cartNo = cartContext.items.reduce((pv, cv) => pv + cv.qty, 0)

  return (
    <header>
      <div>
        <div className="logo">
          <h1>ReactFoods</h1>
        </div>
        <div className="cart" onClick={cartContext.showModalHandler}>
          <BsCartFill />
          <p>Your Cart</p>
          <div className="cart-no">
            <h2>{cartNo}</h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(MainHeader);
