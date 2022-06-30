import { useReducer, useState } from "react";
import CartContext from "./context";

const defaultReducer = {
  items: [],
  totalAmt: 0,
};

const reducer = (state, action) => {
  if (action.type === "ADD") {
    let updateItems;
    const sumUpTotal = state.totalAmt + action.payload.price * action.payload.qty;
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
    const sumUpTotal = state.totalAmt - (existingItem.price * existingItem.qty);
    if (existingItem.qty === 1) {
      updateItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updateItems = [...state.items];
      updateItems[existingIdx] = { ...existingItem, qty: existingItem.qty - 1 };
    }
    return { items: updateItems, totalAmt: sumUpTotal };
  }

  if (action.type === "RESET") {
    return defaultReducer;
  }

  return defaultReducer;
};

const CartContextProvider = (props) => {
  const [cartReducer, dispatchReducer] = useReducer(reducer, defaultReducer);
  const [showModal, setShowModal] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const addItemToCartHandler = (newItem) => {
    dispatchReducer({ type: "ADD", payload: newItem });
  };

  const removeItemToCartHandler = (id) => {
    dispatchReducer({ type: "REMOVE", id: id });
  };

  const resetCartHandler = () => {
    dispatchReducer({ type: "RESET" });
  };

  const cartValue = {
    items: cartReducer.items,
    totalAmt: cartReducer.totalAmt,
    showModal: showModal,
    hideModalHandler: () => setShowModal(false),
    showModalHandler: () => setShowModal(true),  
    showOrderForm: showOrderForm,  
    hideOrderFormHandler: () => setShowOrderForm(false),
    showOrderFormHandler: () => setShowOrderForm(true),  
    resetCartHandler: resetCartHandler,
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
