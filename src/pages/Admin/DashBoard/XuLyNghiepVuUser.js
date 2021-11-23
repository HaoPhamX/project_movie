import React, { useEffect, useState } from 'react'
import { quanlyNguoiDungService } from '../../../services/QuanLyNguoiDung'
import { GROUP_ID, STATUS_CODE, USER_EDIT } from '../../../util/settings/config'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { history } from '../../../App';



export default function XuLyNghiepVuUser() {

    const [state, setState] = useState({
        loaiNguoiDung: [],
    })

    const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

    let userEdit = ''
    if (localStorage.getItem(USER_EDIT)) {
        userEdit = JSON.parse(localStorage.getItem(USER_EDIT))
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userEdit !== '' ? userEdit.taiKhoan : '',
            matKhau: userEdit !== '' ? userEdit.matKhau : '',
            email: userEdit !== '' ? userEdit.email : '',
            soDt: userEdit !== '' ? userEdit.soDt : '',
            maLoaiNguoiDung: userEdit !== '' ? userEdit.maLoaiNguoiDung : state.loaiNguoiDung[0]?.maLoaiNguoiDung,
            hoTen: userEdit !== '' ? userEdit.hoTen : '',
            maNhom: GROUP_ID
        },
        onSubmit: async (values) => {
            if (userEdit === '') {
                try {
                    const { status } = await quanlyNguoiDungService.themNguoiDung(values)
                    if (status === STATUS_CODE.SUCCESS) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Thêm người dùng thành công',
                            timer: 1000
                        })
                        history.push('/admin/users')
                    }
                } catch (err) {
                    console.log(err.response)
                    await Swal.fire({
                        icon: 'error',
                        title: err.response?.data.content,
                        timer: 1000
                    })
                }
            } else {
                try {
                    const { status } = await quanlyNguoiDungService.capNhatThongTinNguoiDung(values)
                    if (status === STATUS_CODE.SUCCESS) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Chỉnh sửa người dùng thành công',
                            timer: 1000
                        })
                        await localStorage.removeItem(USER_EDIT)
                        history.push('/admin/users')
                    }
                } catch (err) {
                    console.log('edit', err.response)
                    await Swal.fire({
                        icon: 'error',
                        title: err.response?.data.content,
                        timer: 1000
                    })
                }
            }
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(4, 'Tối thiểu 4 kí tự').max(16, 'Tối đa 16 kí tự'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(4, 'Tối thiểu 4 kí tự').max(16, 'Tối đa 16 kí tự'),
            email: Yup.string().required('Email không được bỏ trống').email('Vui lòng nhập đúng định dạng emal'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống').matches(regexPhone, 'Vui lòng nhập đúng số điện thoại'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống'),
        }),
        displayName: 'BasicForm',

    });

    const layDanhSachLoaiNguoiDung = async () => {
        try {
            const { data, status } = await quanlyNguoiDungService.layDanhSachLoaiNguoiDung()
            if (status === STATUS_CODE.SUCCESS) {
                setState({
                    ...state,
                    loaiNguoiDung: data.content
                })
            }
        } catch (err) {

        }
    }

    useEffect(() => {
        layDanhSachLoaiNguoiDung()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h3 className="text-2xl mb-10">{userEdit !== '' ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}</h3>
            <div className="container">
                <form onSubmit={formik.handleSubmit} className="flex">
                    <div className="w-1/2">
                        <div>
                            <div className="mb-2 text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                            {userEdit !== ''
                                ?
                                <input value={formik.values.taiKhoan} disabled name="taiKhoan" className="w-3/4 text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 block" placeholder="Nhập tài khoản" />
                                :
                                <input value={formik.values.taiKhoan} onChange={formik.handleChange} name="taiKhoan" className="w-3/4 text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 block" placeholder="Nhập tài khoản" />
                            }

                            <small className="text-red-500">{formik.errors.taiKhoan}</small>
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="mb-2 text-sm font-bold text-gray-700 tracking-wide">
                                    Mật khẩu
                                </div>
                            </div>
                            <input value={formik.values.matKhau} onChange={formik.handleChange} name="matKhau" className="w-3/4 text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 block" placeholder="Nhập mật khẩu" />
                            <small className="text-red-500">{formik.errors.matKhau}</small>
                        </div>
                        <div className="mt-8">
                            <div className="mb-2 flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Họ tên
                                </div>
                            </div>
                            <input value={formik.values.hoTen} onChange={formik.handleChange} name="hoTen" className="w-3/4 text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 block" placeholder="Nhập họ tên" />
                            <small className="text-red-500">{formik.errors.hoTen}</small>
                        </div>
                        <div className="mt-8">
                            <button
                                onClick={() => {
                                    localStorage.removeItem(USER_EDIT)
                                    history.push('/admin/users')
                                }}
                                type="button" className="border px-4 py-2 rounded-md bg-green-500 text-white">Trở lại</button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div>
                            <div className="mb-2 text-sm font-bold text-gray-700 tracking-wide">Email</div>
                            <input value={formik.values.email} onChange={formik.handleChange} name="email" className="w-3/4 text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 block" placeholder="Nhập email" />
                            <small className="text-red-500">{formik.errors.email}</small>
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="mb-2 text-sm font-bold text-gray-700 tracking-wide">
                                    Số điện thoại
                                </div>
                            </div>
                            <input value={formik.values.soDt} onChange={formik.handleChange} name="soDt" className="w-3/4 text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500 block" placeholder="Nhập số điện thoại" />
                            <small className="text-red-500">{formik.errors.soDt}</small>
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="mb-2 text-sm font-bold text-gray-700 tracking-wide">
                                    Loại người dùng
                                </div>
                            </div>
                            <select value={formik.values.maLoaiNguoiDung} onChange={formik.handleChange} name="maLoaiNguoiDung" className="w-3/4 text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500">
                                <option value="disable" disabled>Vui lòng chọn</option>
                                {state.loaiNguoiDung.map((loaiND, index) => {
                                    return <option key={index} value={loaiND.maLoaiNguoiDung}>{loaiND.tenLoai}</option>
                                })}
                            </select>
                        </div>
                        <div className="mt-8 text-right mr-32">
                            {userEdit !== ''
                                ?
                                <button type="submit" onSubmit={formik.handleSubmit} className="border px-4 py-2 rounded-md bg-green-500 text-white">Lưu</button>
                                :
                                <button type="submit" onSubmit={formik.handleSubmit} className="border px-4 py-2 rounded-md bg-green-500 text-white">Thêm</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
