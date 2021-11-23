import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinTaiKhoan } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import _ from 'lodash';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { STATUS_CODE } from '../../util/settings/config';
import { quanlyNguoiDungService } from '../../services/QuanLyNguoiDung';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;

export default function Profile() {

    const dispatch = useDispatch()

    const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer)

    const [capNhatThongTin, setCapNhatThongTin] = useState(false)

    const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinTaiKhoan.taiKhoan,
            matKhau: thongTinTaiKhoan.matKhau,
            email: thongTinTaiKhoan.email,
            soDt: thongTinTaiKhoan.soDT === null ? '' : thongTinTaiKhoan.soDT,
            maNhom: thongTinTaiKhoan.maNhom,
            maLoaiNguoiDung: 'khachHang',
            hoTen: thongTinTaiKhoan.hoTen
        },
        onSubmit: async (values) => {
            console.log(values)
            try {
                const { status } = await quanlyNguoiDungService.nguoiDungCapNhatThongTin(values)
                if (status === STATUS_CODE.SUCCESS) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Chỉnh sửa người dùng thành công',
                        timer: 1000
                    })
                    window.location.reload();
                }
            } catch (err) {
                console.log('edit', err.response)
                await Swal.fire({
                    icon: 'error',
                    title: err.response?.data.content,
                    timer: 1000
                })
            }
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(4, 'Tối thiểu 4 kí tự').max(16, 'Tối đa 16 kí tự'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(4, 'Tối thiểu 4 kí tự').max(16, 'Tối đa 16 kí tự'),
            email: Yup.string().required('Email không được bỏ trống').email('Vui lòng nhập đúng định dạng emal'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống').matches(regexPhone, 'Vui lòng nhập đúng số điện thoại'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống'),
        })

    });


    useEffect(() => {
        dispatch(layThongTinTaiKhoan())
    }, [dispatch])

    return (
        <div>
            <div style={{ backgroundImage: 'url(https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/1470310/f6c406ce62373257471c2d47886400517903522c.jpg)', height: '850px', backgroundSize: 'cover' }}></div>
            <div className="container">
                <Tabs defaultActiveKey="1" onChange={(key) => {
                    if (key === '2') {
                        setCapNhatThongTin(!capNhatThongTin)
                    }
                }}>
                    <TabPane tab={<p className="text-black font-semibold text-xl">Thông tin cá nhân</p>} key="1">
                        <h3 className="text-xl mt-5">{capNhatThongTin ? 'Cập nhật thông tin' : 'Thông tin cá nhân'}</h3>
                        <form onSubmit={formik.handleSubmit} className="container flex my-20">
                            <div className="w-1/3">
                                <div className="flex items-center flex-wrap">
                                    <div className="w-1/4">Email</div>
                                    {capNhatThongTin
                                        ?
                                        <input defaultValue={formik.values.email} onChange={formik.handleChange} name="email" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 block" placeholder="Nhập tài khoản" />
                                        :
                                        <input disabled defaultValue={formik.values.email} name="email" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500 block" />
                                    }
                                </div>
                                <small className="text-red-500 ml-24">{formik.errors.email}</small>
                                <div className="flex items-center mt-10">
                                    <div className="w-1/4">Họ tên</div>
                                    {capNhatThongTin
                                        ?
                                        <input defaultValue={formik.values.hoTen} onChange={formik.handleChange} name="hoTen" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập họ tên" />
                                        :
                                        <input defaultValue={formik.values.hoTen} disabled name="hoTen" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                                    }
                                </div>
                                <small className="text-red-500 ml-24">{formik.errors.hoTen}</small>
                                <div className="flex items-center mt-10">
                                    <div className="w-1/4">Số điện thoại</div>
                                    {capNhatThongTin
                                        ?
                                        <input defaultValue={formik.values.soDt} onChange={formik.handleChange} name="soDt" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập số điện thoại" />
                                        :
                                        <input defaultValue={formik.values.soDt} disabled name="soDt" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />

                                    }
                                </div>
                                <small className="text-red-500 ml-24">{formik.errors.soDt}</small>
                            </div>
                            <div className="w-1/3 ml-10">
                                <div className="flex items-center">
                                    <div className="w-1/4">Tài khoản</div>
                                    <input defaultValue={formik.values.taiKhoan} disabled name="taiKhoan" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                                </div>
                                <small className="text-red-500 ml-24">{formik.errors.taiKhoan}</small>
                                <div className="flex items-center mt-10">
                                    <div className="w-1/4">Mật khẩu</div>
                                    {
                                        capNhatThongTin ?
                                            <input defaultValue={formik.values.matKhau} onChange={formik.handleChange} name="matKhau" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập mật khẩu" />
                                            :
                                            <input defaultValue={formik.values.matKhau} disabled name="matKhau" className="w-3/4 text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" />
                                    }
                                </div>
                                <small className="text-red-500 ml-24">{formik.errors.matKhau}</small>
                                <div className="text-right mt-10">
                                    {capNhatThongTin
                                        ?
                                        <div>
                                            <button type="submit" onClick={formik.handleSubmit} className="px-3 py-1 bg-green-500 text-white rounded-lg">Lưu</button>
                                            <button type="button" onClick={() => {
                                                window.location.reload();
                                            }} className="px-3 py-1 ml-3 bg-gray-500 text-white rounded-lg">Trở lại</button>
                                        </div>
                                        :
                                        <button type="button" onClick={() => { setCapNhatThongTin(!capNhatThongTin) }} className="px-3 py-1 bg-green-500 text-white rounded-lg">Cập nhật</button>
                                    }
                                </div>
                            </div>
                        </form>
                    </TabPane>
                    <TabPane tab={<p className="text-black font-semibold text-xl">Lịch sử đặt vé</p>} key="2">
                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-10 mx-auto">
                                <div className="flex flex-col text-center w-full mb-20">
                                    <h1 className="text-4xl font-medium title-font mb-4 text-green-600 tracking-widest">Lịch sử đặt vé</h1>
                                </div>
                                {
                                    thongTinTaiKhoan.thongTinDatVe?.length === 0
                                        ?
                                        <h3 className="text-center text-lg"> Bạn chưa đặt vé vui lòng đặt vé <NavLink to="/home">Click tại đây</NavLink></h3>
                                        :
                                        <div className="flex flex-wrap -m-4" >
                                            {thongTinTaiKhoan.thongTinDatVe?.map((thongTin, index) => {
                                                const seat = _.first(thongTin?.danhSachGhe)
                                                return <div className="p-4 lg:w-1/2" key={index}>
                                                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                                        <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={thongTin.hinhAnh} />
                                                        <div className="flex-grow sm:pl-8">
                                                            <h2 className="title-font font-medium text-lg text-gray-900">{thongTin.tenPhim}</h2>
                                                            <h3>Địa điểm: {seat?.tenHeThongRap}</h3>
                                                            <p className="mb-2">
                                                                Giờ đăt: {moment(thongTin.ngayDat).format('HH:MM A')} - Ngày chiếu: {moment(thongTin.ngayDat).format('DD-MM-YYYY')} - {seat?.tenCumRap}
                                                            </p>
                                                            <p className="mb-2 font-bold">Danh sách ghế đã chọn: {_.sortBy(thongTin.danhSachGhe, [(o) => Number(o.tenGhe)]).map((ghe, index) => {
                                                                return <span key={index} className="text-red-500 mr-3">
                                                                    [{ghe.tenGhe}]
                                                                </span>
                                                            })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            })}

                                        </div>
                                }
                            </div>
                        </section>
                    </TabPane>
                </Tabs>
            </div>
        </div >
    )
}

