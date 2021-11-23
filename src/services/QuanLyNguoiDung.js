/* eslint-disable no-useless-constructor */
import { GROUP_ID } from "../util/settings/config";
import { BaseService } from "./BaseService";

class QuanlyNguoiDungService extends BaseService {

    constructor() {
        super();
    }
    dangNhap = (thongTinDangNhap) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }
    dangKy = (thongTinDangKy) => {
        return this.post(`/QuanLyNguoiDung/DangKy`, thongTinDangKy)
    }
    lichSuDatVe = () => {
        return this.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    layDanhSachNguoiDung = (keyWord = '') => {
        if (keyWord !== '') {
            return this.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${keyWord}`)
        }
        return this.get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)

    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }
    themNguoiDung = (thongTinNguoiDung) => {
        return this.post(`/QuanLyNguoiDung/ThemNguoiDung`, thongTinNguoiDung)
    }
    capNhatThongTinNguoiDung = (thongTinNguoiDung) => {
        return this.post(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinNguoiDung)
    }
    nguoiDungCapNhatThongTin = (thongTinNguoiDung)=>{
        return this.put(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTinNguoiDung)
    }
}

export const quanlyNguoiDungService = new QuanlyNguoiDungService()
