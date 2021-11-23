import { LAY_THONG_TIN_HE_THONG_RAP } from "../types/QuanLyRapType/QuanLyRapType"

const initialState = {
    heThongRapChieu: [
        {
            "maHeThongRap": "BHDStar",
            "tenHeThongRap": "BHD Star Cineplex",
            "biDanh": "bhd-star-cineplex",
            "logo": "http://movieapi.cyberlearn.vn/hinhanh/bhd-star-cineplex.png"
        }
    ]
}

export const QuanLyRapReducer = (state = initialState, action) => {
    switch (action.type) {

        case LAY_THONG_TIN_HE_THONG_RAP: {
            return { ...state, heThongRapChieu: action.heThongRapChieu }
        }
        default:
            return state
    }
}
