import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import ProductView from "./ProductView";

import Button from "./Button";

import { remove } from "../redux/product-modal/productModalSlice";
import API from "../connect-api/products";
import productData from "../assets/fake-data/products";

const ProductViewModal = () => {
  const productId = useSelector((state) => state.productModal.value);
  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);

  const getProducts = async () => {
    let res = await API.getListProductAll();
    const data = res.result.listproductall.find(
      (item) => (item.productid = productId)
    );
    setProduct(data);
  };
  useEffect(() => {
    getProducts();
  }, [productId]);

  return (
    <div
      className={`product-view__modal ${product === undefined ? "" : "active"}`}
    >
      <div className="product-view__modal__content">
        <ProductView product={product} />
        <div className="product-view__modal__content__close">
          <a size="sm" onClick={() => dispatch(remove())}>
            <i class="bx bx-x"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
