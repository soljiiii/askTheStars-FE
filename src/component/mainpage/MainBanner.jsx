import React from 'react';
import Slider from 'react-slick';
import "../../styles/MainPage.css"
import { NextArrow, PrevArrow } from '../community/PostComponent';


function MainBanner() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        NextArrow: false,
        PrevArrow:false
    };

    return (
        <div>
        <Slider {...settings}>
            <div>
                <img className="banner1" src="/banner1.png" alt="Banner 1" />
            </div>
            <div>
                <img className="banner2" src="/banner2.png" alt="Banner 2" />
            </div>
        </Slider>
        </div>
    );
}

export default MainBanner;
