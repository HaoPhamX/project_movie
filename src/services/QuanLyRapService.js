/* eslint-disable no-useless-constructor */
import { GROUP_ID } from "../util/settings/config";
import { BaseService } from "./BaseService";

class QuanlyRapService extends BaseService {

    constructor() {
        super();
    }
    layLichChieuHeThongRap = () => {
        return this.get(`/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`)
    }
    layThongTinLichChieuPhim = (maPhim) => {
        return this.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    layThongTinHeThongRap = () => {
        return this.get(`/QuanLyRap/LayThongTinHeThongRap`)
    }
    layThongTinCumRap = (maHTTR) => {
        return this.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHTTR}`, maHTTR)
    }
}

export const quanLyRapService = new QuanlyRapService()
