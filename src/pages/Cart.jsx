import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import API from "../connect-api/products";
import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import Select, { createFilter } from "react-select";
import numberWithCommas from "../utils/numberWithCommas";
import { useDispatch } from "react-redux";

const Cart = () => {
  const [listProvince, setListProvince] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [selectedValue, setSelectedValue] = useState(3);
  const dispatch = useDispatch();
  const [listProduct, setListProduct] = useState(undefined);
  const cartItems = useSelector((state) => state.cartItems.value);
  useEffect(() => {
    setListProduct(cartItems);
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setQuantity(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);
  const handleChange = (e) => {
    setSelectedValue(e.label);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let getDataForm = {};
    for (let [key, value] of formData.entries()) {
      getDataForm[key] = value;
    }
    console.log(cartItems);
    const data = {
      bill: {
        customer_id: null,
        voucher_id: null,
        total_price: totalPrice,
        amount: quantity,
        address: getDataForm.address + "-" + selectedValue,
        receiver_name: getDataForm.name,
        email: getDataForm.email,
      },
      list_product_variant: [
        {
          variant_id: 9,
          amount: 1,
        },
      ],
    };
    console.log(data);
    // const result = await API.createBill(data);
    // console.log(result);
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

  return (
    <Helmet title="Giỏ hàng">
      <div className="payment">
        <section className="checkout-form">
          <form onSubmit={handleSubmit}>
            <h3>Thanh toán</h3>
            <div className="form-control">
              <label for="email">E-mail</label>
              <div>
                <span class="fa fa-envelope"></span>
                <input type="email" id="checkout-email" name="email" />
              </div>
            </div>
            <div className="form-control">
              <label for="checkout-phone">Phone</label>
              <div>
                <span class="fa fa-phone"></span>
                <input
                  type="tel"
                  name="phone"
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
                  name="name"
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
                  name="address"
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
                <label for="checkout-postal">Voucher code</label>
                <div>
                  <span class="fa fa-archive"></span>
                  <input
                    type="numeric"
                    name="code"
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
              <button type="submit">
                <span>Thanh toán ngay</span>
              </button>
              <div className="redirect-btn">
                <Link to="/catalog">
                  <button>
                    <span>Tiếp tục mua hàng</span>
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </section>
        <section className="checkout-details">
          <div className="checkout-details-inner">
            <div className="checkout-lists">
              {listProduct?.map((item, index) => (
                <CartItem item={item} key={index} />
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
    </Helmet>
  );
};

export default Cart;
