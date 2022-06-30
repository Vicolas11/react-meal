import { Fragment, useContext, useEffect, useState } from "react";
import "./style.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import CartContext from "../store/context";
import OrderForm from "./OrderForm";

const Modal = () => {
  const cartCxt = useContext(CartContext);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { items, showOrderForm } = cartCxt;
  let totalAmt = cartCxt.items.reduce((cv, nv) => {
    return cv + nv.price * nv.qty;
  }, 0);
  const formatedAmt = totalAmt
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const sendOrderData = async (data) => {
    try {
      setIsLoading(true);
      setHasError(false);
      const response = await fetch(
        "https://react-http-edb1d-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        cartCxt.resetCartHandler();
        setHasSubmitted(true);
      }

      console.log(items);
    } catch {
      setHasError(true);
    }
    setIsLoading(false);
  };

  const onPlusClicked = (data) => {
    cartCxt.addItemToCart({ ...data, qty: 1 });
  };

  const onMinusClicked = (data) => {
    cartCxt.removeItemFromCart(data.id);
  };

  const onOrderBtnClick = () => {
    cartCxt.showOrderFormHandler();
  };

  const userDataCallback = (data) => {
    const info = {
      user: data,
      orders: items,
    };
    sendOrderData(info);
  };

  useEffect(() => {
    setIsCartAdded(items.length > 0);
  }, [items]);

  const submittedComponent = (
    <Fragment>
      <h3 style={{ textAlign: "center" }}>Submitted Successfully!</h3>
      <div className="modal-footer-btn">
        <div className="close-btn">
          <button type="button" onClick={cartCxt.hideModalHandler}>
            Close
          </button>
        </div>
      </div>
    </Fragment>
  );

  const emptyCartComponent = (
    <Fragment>
      <h3 style={{ textAlign: "center" }}>No Cart Added Yet!</h3>
      <div className="modal-footer-btn">
        <div className="close-btn">
          <button type="button" onClick={cartCxt.hideModalHandler}>
            Close
          </button>
        </div>
      </div>
    </Fragment>
  );

  return (
    <div className="backdrop">
      <div className="modal">
        {items.map((data) => (
          <div key={data.id} className="modal-items">
            <div className="modal-meals">
              <h2>{data.title}</h2>
              <div className="modal-price">
                <h2 className="modal-amt">₦{data.price}</h2>
                <h3>
                  X<span>{data.qty}</span>
                </h3>
              </div>
            </div>
            <div className="modal-btn">
              <div className="modal-btn-plus">
                <button type="button" onClick={() => onPlusClicked(data)}>
                  <FaPlus />
                </button>
              </div>
              <div className="modal-btn-minus">
                <button type="button" onClick={() => onMinusClicked(data)}>
                  <FaMinus />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="modal-footer">
          {hasSubmitted && submittedComponent}
          {showOrderForm && isCartAdded && !hasSubmitted && (
            <OrderForm
              userData={userDataCallback}
              formatedAmt={formatedAmt}
              isLoading={isLoading}
              hasError={hasError}
            />
          )}
          {isCartAdded && !showOrderForm ? (
            <div className="total-amt">
              <h3>Total Amount</h3>
              <h3>
                ₦<span>{formatedAmt}</span>
              </h3>
            </div>
          ) : (
            !hasSubmitted && !isCartAdded && (emptyCartComponent)
          )}

          <div className="modal-footer-btn">
            {!showOrderForm && (
              <div className="close-btn">
                <button type="button" onClick={cartCxt.hideModalHandler}>
                  Close
                </button>
              </div>
            )}
            {isCartAdded && !showOrderForm && (
              <div className="order-btn">
                <button onClick={onOrderBtnClick} type="button">
                  Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
