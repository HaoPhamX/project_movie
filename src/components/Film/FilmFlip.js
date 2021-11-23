import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { SET_OPEN_MODAL } from '../../redux/types/ModalVideoType/ModalVideoType'
import './FilmFlips.css'
import { history } from '../../App'

export default function FilmFlip(props) {

    const { film } = props
    const dispatch = useDispatch()

    return (
        <>
            <div className="flip-card w-full">
                <div className="flip-card-inner w-full">
                    <div
                        className="flip-card-front cursor-pointer">
                        <div className="flip-overlay" onClick={() => { history.push(`/detail/${film.maPhim}`) }} ></div>
                        <i className="fa fa-play flip-icon cursor-pointer" onClick={() => dispatch({ type: SET_OPEN_MODAL, url: film.trailer })}></i>
                        <img src={film.hinhAnh} className="w-full" alt="Avatar" style={{ height: '250px', cursor: 'pointer' }} />
                        <div className="flip-card-bottom">
                            <h3 className="flip-flim-name mt-3 text-sm font-bold leading-5 opacity-100">{film.tenPhim}</h3>
                            <div className="flip-film-btn h-0 p-0 w-full bg-red-500 rounded text-center text-white">
                                <NavLink to={`/detail/${film.maPhim}`} className="block  p-3 font-semibold  text-white hover:text-white">
                                    Đặt vé
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
