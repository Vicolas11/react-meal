import { useContext, useEffect, useState } from "react";
import useInput from "../hooks/use-input";
import CartContext from "../store/context";
import "./style.css";

const OrderForm = (props) => {
  const cartCxt = useContext(CartContext);
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    address: true,
    code: true,
  });
  const {
    value: nameValue,
    isValid: nameIsValid,
    onChangeHandler: nameOnChangeHandler,
    onBlurHandler: nameOnBlurHandler,
    reset: nameReset,
  } = useInput();
  const {
    value: addValue,
    isValid: addIsValid,
    onChangeHandler: addOnChangeHandler,
    onBlurHandler: addOnBlurHandler,
    reset: addReset,
  } = useInput();
  const {
    value: pCodeValue,
    isValid: pCodeIsValid,
    onChangeHandler: pCodeOnChangeHandler,
    onBlurHandler: pCodeOnBlurHandler,
    reset: pCodeReset,
  } = useInput();

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    const userInfo = {
      name: nameValue,
      address: addValue,
      code: pCodeValue,
    };
    setFormIsValid({
      name: nameValue.trim() !== "",
      address: addValue.trim() !== "",
      code: pCodeValue.trim() !== "" || pCodeValue.trim().length === 5,
    });

    if (nameValue !== "" && addValue !== "" && pCodeValue !== "") {
      props.userData(userInfo);
      nameReset();
      addReset();
      pCodeReset();
    }
  };

  useEffect(() => {
    if (nameValue.trim().length === 1) {
      setFormIsValid((prev) => ({ ...prev, name: true }));
    }
    if (addValue.trim().length === 1) {
      setFormIsValid((prev) => ({ ...prev, address: true }));
    }
    if (pCodeValue.trim().length === 1) {
      setFormIsValid((prev) => ({ ...prev, code: true }));
    }
  }, [nameValue, addValue, pCodeValue]);

  return (
    <form className="order-form" onSubmit={onSubmitHandler}>
      <div className="form">
        <div className="full-name">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className={`${!nameIsValid && "invalid-form"}`}
            id="name"
            value={nameValue}
            onChange={nameOnChangeHandler}
            onBlur={nameOnBlurHandler}
          />
          {!nameIsValid ||
            (!formIsValid.name && (
              <p className="invalid-text">Full name is required!</p>
            ))}
        </div>
        <div className="address">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className={`${!addIsValid && "invalid-form"} `}
            id="address"
            value={addValue}
            onChange={addOnChangeHandler}
            onBlur={addOnBlurHandler}
          />
          {!addIsValid ||
            (!formIsValid.address && (
              <p className="invalid-text">Address is required!</p>
            ))}
        </div>
        <div className="postal-code">
          <label htmlFor="pcode">Postal Code</label>
          <input
            type="number"
            className={`${!pCodeIsValid && "invalid-form"} `}
            min={1}
            id="pcode"
            value={pCodeValue}
            onChange={pCodeOnChangeHandler}
            onBlur={pCodeOnBlurHandler}
          />
          {!pCodeIsValid ||
            (!formIsValid.code && (
              <p className="invalid-text">Enter a valid code!</p>
            ))}
        </div>
        {props.isLoading && <p>Sending Data!</p>}
        {props.hasError && <p>An error Occured!</p>}
      </div>
      <div className="total-amt">
        <h3>Total Amount</h3>
        <h3>
          ₦<span>{props.formatedAmt}</span>
        </h3>
      </div>
      <div className="modal-footer-btn">
        <div className="close-btn">
          <button type="button" onClick={cartCxt.hideModalHandler}>
            Cancel
          </button>
        </div>
        <div className="order-btn">
          <button type="submit">Confirm</button>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
