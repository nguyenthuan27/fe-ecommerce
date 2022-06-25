import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { remove } from "../redux/payment-modal/paymentModalSlice";
import API from "../connect-api/products";
import numberWithCommas from "../utils/numberWithCommas";
import { updateItem } from "../redux/shopping-cart/cartItemsSlide";
import Select, { createFilter } from "react-select";

const PaymentModal = () => {
  const isVariable = useSelector((state) => state.paymentModal?.value);
  const cartItems = useSelector((state) => state.cartItems.value);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listProvince, setListProvince] = useState([]);
  const [selectedValue, setSelectedValue] = useState(3);
  const dispatch = useDispatch();

  const [listProduct, setListProduct] = useState(undefined);
  useEffect(() => {
    if (isVariable) {
      setListProduct(cartItems);
      setTotalPrice(
        cartItems.reduce(
          (total, item) => total + Number(item.quantity) * Number(item.price),
          0
        )
      );
    } else {
      setListProduct(undefined);
    }
  }, [isVariable]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    for (let [key, value] of formData.entries()) {
      console.log(key, ":", value);
    }
  };
  const getProvince = async () => {
    const data = await API.getProvince();
    const list = data.map((item) => ({
      value: item.codename,
      label: item.name,
    }));
    setListProvince(list);
  };
  useEffect(() => {
    getProvince();
  }, []);
  const handleChange = (e) => {
    console.log(e.label);
    setSelectedValue(e.value);
  };
  return (
    <div
      className={`product-view__modal ${
        listProduct === undefined ? "" : "active"
      }`}
    >
      <div className="product-view__modal__content">
        <div className="payment">
          <section className="checkout-form">
            <form onSubmit={handleSubmit}>
              <h3>Thanh toán</h3>
              <div className="form-control">
                <label for="checkout-email">E-mail</label>
                <div>
                  <span class="fa fa-envelope"></span>
                  <input
                    type="email"
                    id="checkout-email"
                    name="checkout-email"
                  />
                </div>
              </div>
              <div className="form-control">
                <label for="checkout-phone">Phone</label>
                <div>
                  <span class="fa fa-phone"></span>
                  <input
                    type="tel"
                    name="checkout-phone"
                    id="checkout-phone"
                    placeholder="Enter you phone..."
                  />
                </div>
              </div>
              <br />
              <h6>Shipping address</h6>
              <div className="form-control">
                <label for="checkout-name">Full name</label>
                <div>
                  <span class="fa fa-user-circle"></span>
                  <input
                    type="text"
                    id="checkout-name"
                    name="checkout-name"
                    placeholder="Enter you name..."
                  />
                </div>
              </div>
              <div className="form-control">
                <label for="checkout-address">Address</label>
                <div>
                  <span className="fa fa-home"></span>
                  <input
                    type="text"
                    name="checkout-address"
                    id="checkout-address"
                    placeholder="Your address..."
                  />
                </div>
              </div>
              <div className="form-control">
                <label for="checkout-city">City</label>
                <Select options={listProvince} onChange={handleChange} />
              </div>
              <div className="form-group">
                <div className="form-control">
                  <label for="checkout-postal">Postal code</label>
                  <div>
                    <span class="fa fa-archive"></span>
                    <input
                      type="numeric"
                      name="checkout-postal"
                      id="checkout-postal"
                      placeholder="Your postal code..."
                    />
                  </div>
                </div>
              </div>
              <div className="form-control checkbox-control">
                <input
                  type="checkbox"
                  name="checkout-checkbox"
                  id="checkout-checkbox"
                />
                <label for="checkout-checkbox">
                  Save this information for next time
                </label>
              </div>
              <div className="form-control-btn">
                <button type="submit">Thanh toán ngay</button>
              </div>
            </form>
          </section>
          <section className="checkout-details">
            <div className="checkout-details-inner">
              <div className="checkout-lists">
                {listProduct?.map((item, index) => (
                  <div key={index} className="card">
                    <div className="card-img">
                      <div className="card-image">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                    <div className="card-details">
                      <div className="card-name">{item.title}</div>
                      <div className="card-price">
                        {numberWithCommas(item.price * item.quantity)} VND
                      </div>
                      <div className="card-wheel">
                        SIZE: <span>{item.size}</span>
                      </div>
                      <div className="card-wheel">
                        Quantity: <span>{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="checkout-shipping">
                <h6>Shipping</h6>
                <p>$19</p>
              </div>
              <div className="checkout-total">
                <h6>Total</h6>
                <p>{numberWithCommas(Number(totalPrice))} VND</p>
              </div>
            </div>
          </section>
        </div>
        <div className="product-view__modal__content__close">
          <a size="sm" onClick={() => dispatch(remove())}>
            <i class="bx bx-x"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
