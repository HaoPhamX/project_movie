import { quanLyRapService } from "../../services/QuanLyRapService"
import { STATUS_CODE } from "../../util/settings/config"
import { LAY_CHI_TIET_PHIM, LAY_THONG_TIN_HE_THONG_RAP } from "../types/QuanLyRapType/QuanLyRapType"

export const layThongTinHeThongRapAction = () => {
    return async dispatch => {
        try {
            const { data, status } = await quanLyRapService.layLichChieuHeThongRap()
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_THONG_TIN_HE_THONG_RAP,
                    heThongRapChieu: data.content
                })
            }
        } catch (err) {
            console.log('errors', err.response?.data)
        }
    }
}

export const layChiTietPhimAction = (id) => {
    return async dispatch => {
        try {

            const { data, status } = await quanLyRapService.layThongTinLichChieuPhim(id)

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: LAY_CHI_TIET_PHIM,
                    filmDetail: data.content
                })
            }

        } catch (err) {
            console.log(err.response?.data)
        }
    }
}