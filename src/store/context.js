import React from "react";

const CartContext = React.createContext({
  showModal: false,
  items: [],
  totalAmt: 0,
  showOrderForm: false,
  hideOrderFormHandler: () => {},
  showOrderFormHandler: () => {},
  hideModalHandler: () => {},
  showModalHandler: () => {},
  onPlusBtn: () => {},
  onMinusBtn: () => {},
  addItemToCart: () => {},
  resetCartHandler: () => {},
  removeItemFromCart: () => {},
});

export default CartContext;
