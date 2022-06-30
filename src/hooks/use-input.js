import { useState, useReducer, useContext } from "react";
import CartContext from "../store/context";

const defaultValue = {
  value: "",
  inputTouched: false,
  isValid: true,
};

const reducer = (state, action) => {
  if (action.type === "VALUE") {
    return {
      value: action.payload,
      inputTouched: true,
      isValid: action.payload !== "" && state.inputTouched && true,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      inputTouched: true,
      isValid: action.payload !== "" && state.inputTouched && true,
    };
  }
  if (action.type === "RESET") {
    return defaultValue;
  }
  return defaultValue;
};

const useInput = () => {
  const [reducerState, dispatch] = useReducer(reducer, defaultValue);

  const onChangeHandler = (evt) => { 
    dispatch({ type: "VALUE", payload: evt.target.value });
  };

  const onBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    reset,
    value: reducerState.value,
    isValid: reducerState.isValid,
    isTouched: reducerState.inputTouched,
    onChangeHandler,
    onBlurHandler,    
  };
};

export default useInput;
