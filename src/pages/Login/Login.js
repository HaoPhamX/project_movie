import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Login(props) {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        onSubmit: values => {
            dispatch(dangNhapAction(values))
        },

    });


    return (
        <>
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                    <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold">Đăng nhập</h2>
                    <div className="mt-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Tài khoản</div>
                                <input onChange={formik.handleChange} name="taiKhoan" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập tài khoản" />
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Mật khẩu
                                    </div>
                                </div>
                                <input onChange={formik.handleChange} name="matKhau" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Nhập mật khẩu" />
                            </div>
                            <div className="mt-10">
                                <button type="submit" onClick={formik.handleSubmit} className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                            Bạn chưa có tài khoản ? <NavLink to="/register" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng kí</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
