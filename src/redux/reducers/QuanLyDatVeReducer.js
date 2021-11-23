import { ThongTinPhongVe } from "../../_core/models/ThongTinPhongVe"
import { CHON_GHE, CHUYEN_TAB_DAT_VE, CHUYEN_TAB_HOAN_TAT, DAT_VE_HOAN_TAT, LAY_CHI_TIET_PHONG_VE } from "../types/QuanLyDatVeType/QuanLyDatVeType"


export const TAB_CHON_GHE = '1'
export const TAB_KET_QUA_DAT_VE = '2'

const initialState = {
    chiTietPhongVe: new ThongTinPhongVe(),
    danhSachGheDangDat: [],
    danhSachGheKhachDat: [{ maGhe: 120297, tenGhe: 97 }, { maGhe: 120298, tenGhe: 98 }],
    tabActive: TAB_CHON_GHE,

}

export const QuanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {

        case LAY_CHI_TIET_PHONG_VE: {
            return { ...state, chiTietPhongVe: action.chiTietPhongVe }
        }

        case CHON_GHE: {
            //cập nhật danh sách ghế đang đặt
            let danhSachGheCapNhat = [...state.danhSachGheDangDat]
            let index = danhSachGheCapNhat.findIndex(ghe => ghe.maGhe === action.gheDuocChon.maGhe)

            if (index !== -1) {
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            state.danhSachGheDangDat = danhSachGheCapNhat
            return { ...state }
        }
        case DAT_VE_HOAN_TAT: {
            return { ...state, danhSachGheDangDat: [] }
        }

        case CHUYEN_TAB_HOAN_TAT: {
            return { ...state, tabActive: TAB_KET_QUA_DAT_VE }
        }

        case CHUYEN_TAB_DAT_VE: {
            return { ...state, tabActive: action.key }
        }


        default:
            return state
    }
}
