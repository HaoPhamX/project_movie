import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Slider from "react-slick";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/types/QuanLyPhimType/QuanLyPhimType';
import FilmFlip from '../Film/FilmFlip';
import styles from './MultipleRow.module.css'

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;

    return (
        <button
            className={className}
            style={{
                ...style, display: "block", position: 'absolute', top: '45%', left: '-7%', backgroundImage: 'url(https://tix.vn/app/assets/img/icons/back-session.png)', height: '100px', width: '50px', backgroundRepeat: 'no-repeat',
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
                ...style, display: "block", top: '45%', right: '-7%', backgroundImage: 'url(https://tix.vn/app/assets/img/icons/next-session.png)', height: '100px', width: '50px', backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain', backgroundPosition: 'center'
            }}
            onClick={onClick}
        />
    );
}

export default function MultipleRow(props) {

    const dispatch = useDispatch()
    const [active, setActive] = useState(true)
    const { arrFilm } = props;
    const renderFilms = () => {
        return arrFilm.map((item, index) => {
            return <div key={index} className="p-1">
                <FilmFlip film={item} />
            </div>
        })
    }

    const settings = {
        infinite: true,
        speed: 500,
        rows: 2,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />

    };
    return (
        <div className="text-center">
            <div className="h-full my-7">
                <span
                    onClick={() => {
                        dispatch({ type: SET_FILM_DANG_CHIEU })
                        setActive(true)
                    }}
                    className={`${active ? styles.active : ''} ${styles['select-film']} font-medium text-coolGray-800 transition-all duration-300 text-xl mr-2 leading-6 cursor-pointer`}>
                    Đang Chiếu
                </span>
                <span
                    onClick={() => {
                        dispatch({ type: SET_FILM_SAP_CHIEU })
                        setActive(false)
                    }}
                    className={`${active ? '' : styles.active} ${styles['select-film']} transition-all duration-300 font-medium select-film text-coolGray-800 ml-2 text-xl leading-6 cursor-pointer`}>Sắp Chiếu</span>
            </div>
            <Slider {...settings} className="carousel-banner film" style={{ height: '750px' }}>
                {renderFilms()}
            </Slider>
        </div>
    )
}
