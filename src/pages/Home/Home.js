import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultipleRow from '../../components/ReactSlick/MultipleRow'
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction'
import { layThongTinHeThongRapAction } from '../../redux/actions/QuanLyRapAction'
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import './HomeCarousel.css'

import HomeMenu from './HomeMenu/HomeMenu'

export default function Home() {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layDanhSachPhimAction())
        dispatch(layThongTinHeThongRapAction())
    }, [dispatch])
    return (
        <div>
            <HomeCarousel />
            <div className="max-w-5xl m-auto">
                <MultipleRow arrFilm={arrFilm} />
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
        </div>
    )
}
