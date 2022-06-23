import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { set } from '../redux/product-modal/productModalSlice'

import Button from './Button'

import numberWithCommas from '../utils/numberWithCommas'

const ProductCard = props => {

    const dispatch = useDispatch()

    return (
      <div className="product-card">
        <Link to={`/catalog/${props?.data?.productid}`}>
          <div className="product-card__image">
            {props?.data?.listimg?.map((item, index) => (
              <img key={index} src={item} alt="" />
            ))}
          </div>
          <h3 className="product-card__name">{props?.data?.productname}</h3>
          <div className="product-card__price">
            {numberWithCommas(props.data?.fromprice || 0)}
            <span className="product-card__price__old">
              <del>{numberWithCommas(399000)}</del>
            </span>
          </div>
        </Link>
        <div className="product-card__btn">
          <Button
            size="sm"
            icon="bx bx-cart"
            animate={true}
            onClick={() => dispatch(set(props.data.productid))}
          >
            chọn mua
          </Button>
        </div>
      </div>
    );
}


export default ProductCard
