/// create component login
import React, { Component, useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import "../sass/components/_order-product.scss";
import { useSelector, useDispatch } from "react-redux";
import API from "../connect-api/products";
const OrderProduct = () => {
  const [listBill, setListBill] = useState([]);

  const getListBill = async () => {
    const res = await API.getListBill(1);
    setListBill(res.result);
    console.log(res.result);
  };
  useEffect(() => {
    getListBill();
  }, []);
  return (
    <>
      <Helmet title="Order Product" />
      <div className="content-order">
        <div class="basket">
          <div class="basket-module">
            <label for="promo-code">Mã đơn hàng</label>
            <input
              id="promo-code"
              type="text"
              name="promo-code"
              maxlength="5"
              class="promo-code-field"
            />
            <button class="promo-code-cta">Tìm</button>
          </div>
          <div class="basket-labels">
            <ul>
              <li className="subtotal">Mã đơn hàng</li>
              <li className="item item-heading">Thông tin</li>
              <li class="quantity">Số Lượng</li>
              <li class="subtotal">Tổng</li>
              <li class="subtotal">Trạng thái đơn hàng</li>
            </ul>
          </div>
          {listBill?.map((item, index) => {
            return (
              <div key={index} class="basket-product">
                <div class="subtotal">{item.bill_code}</div>
                <div class="item">
                  <div class="product-image">
                    {/* {item.list_product_variant.map((item, index) => {
                      return (
                        <img
                          src={item.product_image}
                          alt="product"
                          class="product-image"
                        />
                      );
                    })} */}
                  </div>
                  <div class="product-details">
                    {item.list_product_variant.map((value, index) => {
                      return (
                        <div className="item-product">
                          <div class="product-name">- {value.productName}</div>
                          <div>
                            Option:
                            {value.data.map((item) => {
                              return (
                                <div className="item-test">
                                  <div>{item.option_name}: </div>
                                  <span>
                                    {item.datadetail[0].option_value_name}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <div>Giá: {value.price} </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div class="quantity">
                  <input
                    type="number"
                    value={item.amount}
                    min="1"
                    class="quantity-field"
                  />
                </div>
                <div class="subtotal">{item.total_price} VND</div>
                <div class="subtotal">{item.state_vi}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default OrderProduct;
