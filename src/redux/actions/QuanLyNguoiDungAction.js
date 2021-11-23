import { quanlyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { STATUS_CODE } from "../../util/settings/config"
import { DANG_NHAP, THONG_TIN_TAI_KHOAN } from "../types/QuanLyNguoiDungType/QuanLyNguoiDungType"
import { history } from '../../App'
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"
import Swal from "sweetalert2"

export const dangNhapAction = (thongTinDangNhap) => {
    return async dispatch => {
        try {

            const { data, status } = await quanlyNguoiDungService.dangNhap(thongTinDangNhap)

            console.log(data)

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: DANG_NHAP,
                    userLogin: data.content
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng nhập thành công',
                    timer: 1000
                })
                history.push('/home'); // chuyển hướng đăng nhập về trang trước đó
            }

        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: err.response?.data.content,
                timer: 1000
            })
        }
    }
}

export const layThongTinTaiKhoan = () => {
    return async dispatch => {
        try {
            await dispatch(displayLoadingAction)
            const { data, status } = await quanlyNguoiDungService.lichSuDatVe()
            if (status === STATUS_CODE.SUCCESS) {
                await dispatch({
                    type: THONG_TIN_TAI_KHOAN,
                    thongTinTaiKhoan: data.content

                })
                await dispatch(hideLoadingAction)
            }

        } catch (err) {
            console.log(err)
            dispatch(hideLoadingAction)
        }
    }
}