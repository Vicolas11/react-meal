import { useContext, useEffect, useState } from "react";
import "./style.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import CartContext from "../store/context";

const Modal = () => {
  const cartContext = useContext(CartContext);
  const [isCartAdded, setIsCartAdded] = useState(false)
  const {items} = cartContext
  const totalAmt = cartContext.items.reduce((cv, nv) => {
    return cv + nv.amt * nv.qty;
  }, 0);

  const onPlusClicked = (data) => {
    cartContext.addItemToCart({...data, qty: 1})
  };

  const onMinusClicked = (data) => {
    cartContext.removeItemFromCart(data.id)
  };

  useEffect(() => {
    setIsCartAdded(items.length > 0);
  }, [items])

  return (
    <div className="backdrop">
      <div className='modal'>
        {items.map((data, idx) => (
          <div key={data.id} className="modal-items">
            <div className="modal-meals">
              <h2>{data.title}</h2>
              <div className="modal-price">
                <h2 className="modal-amt">₦{data.amt}</h2>
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
          {isCartAdded ? <div className="total-amt">
            <h3>Total Amount</h3>
            <h3>
              ₦<span>{totalAmt}</span>
            </h3>
          </div> : <h3 style={{textAlign: 'center'}}>No Cart Added Yet!</h3>}
          <div className="modal-footer-btn">
            <div className="close-btn">
              <button type="button" onClick={cartContext.hideModalHandler}>
                Close
              </button>
            </div>
            {isCartAdded && <div className="order-btn">
              <button type="button">Order</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
