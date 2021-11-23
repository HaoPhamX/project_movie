import { quanLyDatVeService } from "../../services/QuanLyDatVeService"
import { STATUS_CODE } from "../../util/settings/config"
import { CHUYEN_TAB_HOAN_TAT, DAT_VE_HOAN_TAT, LAY_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType/QuanLyDatVeType"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            dispatch(displayLoadingAction)
            const { data, status } = await quanLyDatVeService.layChiTietPhongVe(maLichChieu)
            if (status === STATUS_CODE.SUCCESS) {
                await dispatch({
                    type: LAY_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: data.content
                })
                dispatch(hideLoadingAction)
            }

        } catch (err) {
            console.log(err)
            dispatch(hideLoadingAction)
        }
    }
}

export const datVeAction = (thongTinDatVe) => {
    return async dispatch => {
        try {

            dispatch(displayLoadingAction)

            const { status } = await quanLyDatVeService.datVe(thongTinDatVe)

            if (status === STATUS_CODE.SUCCESS) {
                await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
                await dispatch({ type: DAT_VE_HOAN_TAT })
                await dispatch(hideLoadingAction)
                await dispatch({ type: CHUYEN_TAB_HOAN_TAT })
            }

        } catch (err) {
            console.log(err)
            dispatch(hideLoadingAction)
        }
    }
}
