/* eslint-disable no-useless-constructor */
import { GROUP_ID } from "../util/settings/config";
import { BaseService } from "./BaseService";

class QuanlyPhimService extends BaseService {

    constructor() {
        super();
    }
    layDanhSachBanner = () => {
        return this.get(`/QuanLyPhim/LayDanhSachBanner`)
    }
    layDanhSachPhim = (tenPhim = '') => {
        if (tenPhim !== '') {
            return this.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`)
        }
        return this.get(`/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`)
    }
    themPhimUpLoadHinh = (formData) => {
        return this.post(`/QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhim = (maPhim) => {
        return this.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhatPhimUpload = (formData) => {
        return this.post(`/QuanLyPhim/CapNhatPhimUpload`, formData)
    }
    xoaPhim = (maPhim) => {
        return this.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanlyPhimService()
