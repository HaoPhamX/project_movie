import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselAction';
import Slider from "react-slick";

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style, display: "block", position: 'absolute', top: '50%', left: '3%', backgroundImage: 'url(https://tix.vn/app/assets/img/icons/back-session.png)', height: '100px', width: '50px', backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain', zIndex: '1', backgroundPosition: 'center'
            }}
            onClick={onClick}
        />
    );
}

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{
                ...style, display: "block", top: '50%', right: '3%', backgroundImage: 'url(https://tix.vn/app/assets/img/icons/next-session.png)', height: '100px', width: '50px', backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain', backgroundPosition: 'center'
            }}
            onClick={onClick}
        />
    );
}

export default function HomeCarousel() {

    const { arrBanner } = useSelector(state => state.CarouselReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCarouselAction())
    }, [dispatch])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dotsClass: 'button__bar',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const renderBanner = () => {
        return arrBanner.map((item, index) => {
            return <div key={index}>
                <div style={{ backgroundImage: `url(${item.hinhAnh})`, backgroundSize: 'cover', height: '800px' }} >
                    <img src={item.hinhAnh} className="w-full h-full opacity-0" alt={item.hinhAnh} />
                </div>
            </div>
        })
    }

    return (
        <div >
            <Slider {...settings} className="carousel-banner">
                {renderBanner()}
            </Slider>
        </div>
    )
}
