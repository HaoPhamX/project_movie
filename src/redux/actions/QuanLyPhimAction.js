import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { LAY_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "../types/QuanLyPhimType/QuanLyPhimType"
import { history } from '../../App'

export const layDanhSachPhimAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            const { data } = await quanLyPhimService.layDanhSachPhim(tenPhim)
            dispatch({
                type: LAY_DANH_SACH_PHIM,
                arrFilm: data.content
            })

        } catch (err) {
            console.log('errors', err)
        }
    }
}

export const themPhimUpLoadHinhAction = (formData) => {
    return async (dispatch) => {
        try {

            await quanLyPhimService.themPhimUpLoadHinh(formData)
            alert('thêm phim thành công')

        } catch (err) {
            console.log(err)
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {

            const result = await quanLyPhimService.layThongTinPhim(maPhim)
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })

        } catch (err) {
            console.log(err)
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {

            await quanLyPhimService.capNhatPhimUpload(formData)
            alert('Cập nhật thành công')
            history.push('/admin/flims')
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            await quanLyPhimService.xoaPhim(maPhim)
            alert('Xóa phim thành công')
            dispatch(layDanhSachPhimAction())
        } catch (err) {
            console.log(err.response?.data)
        }
    }
}