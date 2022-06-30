import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { updateItem, removeItem } from "../redux/shopping-cart/cartItemsSlide";

import numberWithCommas from "../utils/numberWithCommas";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const itemRef = useRef(null);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props?.item?.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props?.item?.quantity);
  }, [props.item]);

  const updateQuantity = (opt) => {
    if (opt === "+") {
      dispatch(updateItem({ ...item, quantity: quantity + 1 }));
    }
    if (opt === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 })
      );
    }
  };

  const removeCartItem = () => {
    console.log("removeCartItem");
    dispatch(removeItem(item));
  };

  return (
    <>
      <div className="card">
        <div className="card-img">
          <div className="card-image">
            <img src={item.image} alt="" />
          </div>
        </div>
        <div className="card-details">
          <Link to={`/catalog/${item?.id}`}>
            <div className="card-name">{item.title}</div>
          </Link>
          <div className="card-price">
            {numberWithCommas(item.price * item.quantity)} VND
          </div>
          <div className="card-wheel">
            SIZE: <span>{item.size}</span>
          </div>
          <div className="card-wheel">
            COLOR:{" "}
            <div
              className="color"
              style={{ background: `${item.color}` }}
            ></div>
          </div>
          <div class="card-wheel1">
            <button onClick={() => updateQuantity("-")}>-</button>
            <span> {quantity}</span>
            <button onClick={() => updateQuantity("+")}>+</button>
          </div>
          <div className="cart__item__del">
            <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
          </div>
        </div>
      </div>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
