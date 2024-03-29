import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { withRouter } from "react-router";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemsSlide";
import { remove } from "../redux/product-modal/productModalSlice";

import Button from "./Button";
import numberWithCommas from "../utils/numberWithCommas";

const ProductView = (props) => {
  const dispatch = useDispatch();

  let product = props?.product || "";
  const [previewImg, setPreviewImg] = useState(
    product?.listimg?.map((item) => item)[0]
  );

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState({
    option_value_id: "",
    option_value_name: "",
  });

  const [size, setSize] = useState({
    option_value_id: "",
    option_value_name: "",
  });

  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };
  useEffect(() => {
    setPreviewImg(product?.listimg?.map((item) => item)[0]);
    setQuantity(1);
    setColor(undefined);
    setSize(undefined);
  }, [product]);

  const check = () => {
    if (color === undefined) {
      toast.error("Vui lòng chọn màu sắc!");
      return false;
    }

    if (size === undefined) {
      toast.error("Vui lòng chọn kích cỡ!");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    console.log(product);
    if (check()) {
      let newItem = {
        slug: product.productid,
        color: color.option_value_name,
        colorId: color.option_value_id,
        size: size.option_value_name,
        sizeId: size.option_value_id,
        price: product.fromprice,
        quantity: quantity,
        title: product.productname,
        image: product.listimg[0],
      };
      if (dispatch(addItem(newItem))) {
        toast.success("Thêm thành công vào giỏ hàng của bạn !!!");
      } else {
        toast.error("Fail");
      }
    }
  };

  const goToCart = () => {
    console.log(product);
    if (check()) {
      let newItem = {
        slug: product.productid,
        color: color,
        size: size,
        // optionId: product.optionId,
        price: product.fromprice,
        quantity: quantity,
        title: product.productname,
        image: product.listimg[0],
      };
      if (dispatch(addItem(newItem))) {
        dispatch(remove());
        props.history.push("/cart");
      } else {
        toast.error("Fail");
      }
    }
  };

  return (
    <>
      <div className="product">
        <div className="product__images">
          <div className="product__images__list">
            <div
              className="product__images__list__item"
              onClick={() =>
                setPreviewImg(product?.listimg?.map((item) => item)[0])
              }
            >
              <img src={product?.listimg?.map((item) => item)[0]} alt="" />
            </div>
            <div
              className="product__images__list__item"
              onClick={() =>
                setPreviewImg(product?.listimg?.map((item) => item)[1])
              }
            >
              <img src={product?.listimg?.map((item) => item)[1]} alt="" />
            </div>
          </div>
          <div className="product__images__main">
            <img src={previewImg} alt="" />
          </div>
          <div
            className={`product-description ${
              descriptionExpand ? "expand" : ""
            }`}
          >
            <div className="product-description__title">Chi tiết sản phẩm</div>
            <div
              className="product-description__content"
              dangerouslySetInnerHTML={{ __html: product?.note }}
            ></div>
            <div className="product-description__toggle">
              <Button
                size="sm"
                onClick={() => setDescriptionExpand(!descriptionExpand)}
              >
                {descriptionExpand ? "Thu gọn" : "Xem thêm"}
              </Button>
            </div>
          </div>
        </div>
        <div className="product__info">
          <h1 className="product__info__title">{product?.productname}</h1>
          <div className="product__info__item">
            <span className="product__info__item__price">
              {numberWithCommas(product?.fromprice || 0)}
            </span>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">Màu sắc</div>
            <div className="product__info__item__list">
              {product?.list
                ?.map((i) => i)[0]
                ?.data[0].datadetail?.map((item, index) => (
                  <div
                    key={index}
                    className={`product__info__item__list__item ${
                      color?.option_value_name === item?.option_value_name
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setColor({
                        option_value_id: item?.option_value_id,
                        option_value_name: item?.option_value_name,
                      })
                    }
                  >
                    <div
                      className={`circle bg-${item?.option_value_name}`}
                      style={{ background: `${item?.option_value_name}` }}
                    ></div>
                  </div>
                ))}
            </div>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">Kích cỡ</div>
            <div className="product__info__item__list">
              {product?.list
                ?.map((i) => i)[0]
                ?.data[1].datadetail?.map((item, index) => (
                  <div
                    key={index}
                    className={`product__info__item__list__item ${
                      size?.option_value_name === item?.option_value_name
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSize({
                        option_value_id: item?.option_value_id,
                        option_value_name: item?.option_value_name,
                      })
                    }
                  >
                    <span className="product__info__item__list__item__size">
                      {item?.option_value_name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="product__info__item">
            <div className="product__info__item__title">Số lượng</div>
            <div className="product__info__item__quantity">
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("minus")}
              >
                <i className="bx bx-minus"></i>
              </div>
              <div className="product__info__item__quantity__input">
                {quantity}
              </div>
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("plus")}
              >
                <i className="bx bx-plus"></i>
              </div>
            </div>
          </div>
          <div className="product__info__item">
            <Button onClick={() => addToCart()}>thêm vào giỏ</Button>
            <Button onClick={() => goToCart()}>mua ngay</Button>
          </div>
        </div>
        <div
          className={`product-description mobile ${
            descriptionExpand ? "expand" : ""
          }`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{ __html: product?.note }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
