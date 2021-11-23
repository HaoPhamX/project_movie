import { LAY_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimType/QuanLyPhimType"
import { LAY_CHI_TIET_PHIM } from "../types/QuanLyRapType/QuanLyRapType"

const initialState = {
    arrFilm: [
    ],
    arrFilmDefaul: [],
    filmDetail: {},
    thongTinPhim: {}
}

export const QuanLyPhimReducer = (state = initialState, action) => {
    switch (action.type) {

        case LAY_DANH_SACH_PHIM:
            return { ...state, arrFilm: action.arrFilm.filter(film => film.dangChieu === true), arrFilmDefaul: action.arrFilm }

        case SET_FILM_DANG_CHIEU: {
            return { ...state, arrFilm: state.arrFilmDefaul.filter(film => film.dangChieu === true) }
        }

        case SET_FILM_SAP_CHIEU: {
            return { ...state, arrFilm: state.arrFilmDefaul.filter(film => film.sapChieu === true) }
        }

        case LAY_CHI_TIET_PHIM: {
            return { ...state, filmDetail: action.filmDetail }
        }
        case SET_THONG_TIN_PHIM: {
            return { ...state, thongTinPhim: action.thongTinPhim }
        }

        default:
            return state
    }
}
