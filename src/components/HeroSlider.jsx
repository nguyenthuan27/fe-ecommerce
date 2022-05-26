import React, { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Button from './Button'

const HeroSlider = props => {

    const data = props.data

    const delay = props.timeOut ? props.timeOut : 3000

    const [activeSlide, setActiveSlide] = useState(0);

    const timeoutRef = useRef(null);
    const resetTimeout = () => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    }

    useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
        () =>
        setActiveSlide((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        ),
        delay
    );

    return () => {
        resetTimeout();
    };
    }, [activeSlide]);
    return (
        <div className="hero-slider">
            {
                data.map((item, index) => (
                    <HeroSliderItem key={index} item={item} active={index === activeSlide}/>
                ))
            }
            {
                props.control ? (
                    <div className="hero-slider__control">
                        <div className="hero-slider__control__item">
                            <div className="indexs">
                                {data.map((_, idx) => (
                                    <div
                                    key={idx}
                                    className={`index${activeSlide === idx ? " active" : ""}`}
                                    onClick={() => {
                                        setActiveSlide(idx);
                                    }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control: PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number
}

const HeroSliderItem = props => (
    <div className={`hero-slider__item ${props.active ? 'active' : ''}`}>
        <div className="hero-slider__item__info">
            <div className={`hero-slider__item__info__title color-${props.item.color}`}>
                <span>{props.item.title}</span>
            </div>
            <div className="hero-slider__item__info__description">
                <span>{props.item.description}</span>
            </div>
            <div className="hero-slider__item__info__btn">
                <Link to={props.item.path}>
                    <Button
                        backgroundColor={props.item.color}
                        icon="bx bx-cart"
                        animate={true}
                    >
                        xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
        <div className="hero-slider__item__image">
            <div className={`shape bg-${props.item.color}`}></div>
            <img src={props.item.img} alt="" />
        </div>
    </div>
)

export default HeroSlider
