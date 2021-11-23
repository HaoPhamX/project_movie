import { useFormik } from 'formik';
import React from 'react'
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup'
import { quanlyNguoiDungService } from '../../services/QuanLyNguoiDung';
import { STATUS_CODE } from '../../util/settings/config';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { DANG_KY } from '../../redux/types/QuanLyNguoiDungType/QuanLyNguoiDungType';


const maNhomOption = ['GP00', 'GP01', 'GP02', 'GP03', 'GP04', 'GP05', 'GP06', 'GP07', 'GP08', 'GP09', 'GP010', 'GP011', 'GP012', 'GP013', 'GP014', 'GP015', 'GP016']

const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/


export default function Register(props) {

    const history = useHistory()

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            xacNhanMatKhau: '',
            email: '',
            soDt: '',
            maNhom: maNhomOption[0],
            hoTen: ''
        },
        onSubmit: async (values) => {
            try {
                //call api đăng kí
                const { status } = await quanlyNguoiDungService.dangKy(values)
                if (status === STATUS_CODE.SUCCESS) {
                    // call api đăng nhập vì không có token
                    const result = await quanlyNguoiDungService.dangNhap(values)
                    if (result.status === STATUS_CODE.SUCCESS) {
                        dispatch({
                            type: DANG_KY,
                            userLogin: result.data.content
                        })
                    }
                    await Swal.fire({
                        icon: 'success',
                        title: 'Đăng kí tài khoản thành công',
                        timer: 500
                    })
                    history.push('/home')
                }
            } catch (err) {
                console.log(err.response?.data)
                if (err.response?.data.content === 'Email đã tồn tại!') {
                    formik.errors.email = 'Email đã tồn tại!'
                }
                else if (err.response?.data.content === 'Tài khoản đã tồn tại!') {
                    formik.errors.taiKhoan = 'Tài khoản đã tồn tại!'
                }
            }
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống').min(4, 'Tối thiểu 4 kí tự').max(16, 'Tối đa 16 kí tự'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(4, 'Tối thiểu 4 kí tự').max(16, 'Tối đa 16 kí tự'),
            xacNhanMatKhau: Yup.string().required('Xác nhận mật khẩu không được bỏ trống').oneOf([Yup.ref('matKhau')], 'Nhập lại mật khẩu không khớp'),
            email: Yup.string().required('Email không được bỏ trống').email('Vui lòng nhập đúng định dạng emal'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống').matches(regexPhone, 'Vui lòng nhập đúng số điện thoại'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống'),
        })

    });
    return (
        <>
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="mt-5 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-5 xl:px-24 xl:max-w-2xl">
                    <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
          xl:text-bold">Đăng kí</h2>
                    <div className="mt-2">
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                                <input onChange={formik.handleChange} name="taiKhoan" className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập tài khoản" />
                                <small className="text-red-500">{formik.errors.taiKhoan}</small>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Mật khẩu
                                    </div>
                                </div>
                                <input onChange={formik.handleChange} name="matKhau" className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập mật khẩu" />
                                <small className="text-red-500">{formik.errors.matKhau}</small>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Nhập lại mật khẩu
                                    </div>
                                </div>
                                <input onChange={formik.handleChange} name="xacNhanMatKhau" className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập lại mật khẩu" />
                                <small className="text-red-500">{formik.errors.xacNhanMatKhau}</small>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Email
                                    </div>
                                </div>
                                <input onChange={formik.handleChange} name="email" className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập email" />
                                <small className="text-red-500">{formik.errors.email}</small>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Số điện thoại
                                    </div>
                                </div>
                                <input onChange={formik.handleChange} name="soDt" className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập số điện thoại" />
                                <small className="text-red-500">{formik.errors.soDt}</small>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Mã nhóm
                                    </div>
                                </div>
                                <select onChange={formik.handleChange} name="maNhom" className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" >
                                    <option value='disable' disabled >Vui lòng chọn</option>
                                    {maNhomOption.map((nhom, index) => {
                                        return <option key={index} value={nhom}>{nhom}</option>
                                    })}
                                </select>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Họ tên
                                    </div>
                                </div>
                                <input onChange={formik.handleChange} name="hoTen" className="w-full text-lg py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập họ tên" />
                                <small className="text-red-500">{formik.errors.hoTen}</small>
                            </div>
                            <div className="mt-10">
                                <button type="submit" onClick={formik.handleSubmit} className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                      shadow-lg">
                                    Đăng kí
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Bạn đã có tài khoản ? <NavLink to="/login" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng nhập</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
