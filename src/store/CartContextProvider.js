import { useReducer, useState } from "react";
import CartContext from "./context";

const reducer = (state, action) => {
  if (action.type === "ADD") {
    let updateItems;
    const sumUpTotal = state.totalAmt + action.payload.amt * action.payload.qty;
    const existingIdx = state.items.findIndex(
      (items) => items.id === action.payload.id
    );
    const existingItem = state.items[existingIdx];

    if (existingItem) {
      const updateItem = {
        ...existingItem,
        qty: existingItem.qty + action.payload.qty,
      };
      updateItems = [...state.items];
      updateItems[existingIdx] = updateItem;
    } else {
      updateItems = [...state.items, action.payload];
    }

    return { items: updateItems, totalAmt: sumUpTotal };
  }

  if (action.type === "REMOVE") {
    const existingIdx = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[existingIdx];
    let updateItems;
    const sumUpTotal = state.totalAmt - (existingItem.amt * existingItem.qty);
    if (existingItem.qty === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updateItems = [...state.items];
      updateItems[existingIdx] = { ...existingItem, qty: existingItem.qty - 1 };
    }
    return { items: updateItems, totalAmt: sumUpTotal };
  }

  return { items: [], totalAmt: 0 };
};

const defaultReducer = {
  items: [],
  totalAmt: 0,
};

const CartContextProvider = (props) => {
  const [cartReducer, dispatchReducer] = useReducer(reducer, defaultReducer);
  const [showModal, setShowModal] = useState(false);

  const addItemToCartHandler = (newItem) => {
    dispatchReducer({ type: "ADD", payload: newItem });
  };

  const removeItemToCartHandler = (id) => {
    // console.log(id)
    dispatchReducer({ type: "REMOVE", id: id });
  };

  const cartValue = {
    showModal: showModal,
    items: cartReducer.items,
    totalAmt: cartReducer.totalAmt,
    hideModalHandler: () => setShowModal(false),
    showModalHandler: () => setShowModal(true),
    addItemToCart: addItemToCartHandler,
    removeItemFromCart: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
