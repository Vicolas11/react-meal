import React from "react";

const CartContext = React.createContext({
  showModal: false,
  items: [],
  totalAmt: 0,
  hideModalHandler: () => {},
  showModalHandler: () => {},
  onPlusBtn: () => {},
  onMinusBtn: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
});

export default CartContext;
