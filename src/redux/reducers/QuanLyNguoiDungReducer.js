import { TOKEN, USER_LOGIN } from "../../util/settings/config"
import { DANG_KY, DANG_NHAP, THONG_TIN_TAI_KHOAN } from "../types/QuanLyNguoiDungType/QuanLyNguoiDungType"

let userLogin = {}

if (localStorage.getItem(USER_LOGIN)) {
    userLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin,
    thongTinTaiKhoan: {}
}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {
        case DANG_NHAP: {
            localStorage.setItem(TOKEN, action.userLogin.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin))
            return { ...state, userLogin: action.userLogin }
        }
        case DANG_KY: {
            localStorage.setItem(TOKEN, action.userLogin.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin))
            return { ...state, userLogin: action.userLogin }
        }

        case THONG_TIN_TAI_KHOAN: {
            return { ...state, thongTinTaiKhoan: action.thongTinTaiKhoan }
        }

        default:
            return state
    }
}
