import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { history } from '../../../../App'
import { Select } from 'antd';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';

const { Option } = Select;

export default function Header(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)


    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <div className="items-center flex-shrink-0 hidden lg:flex">
                <button
                    onClick={() => {
                        history.push("/Login")
                    }}
                    className="self-center px-8 py-3 rounded">{t('Sign in')}</button>
                <button
                    onClick={() => {
                        history.push("/register")
                    }}
                    className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50">{t('Sign up')}</button>
            </div>
        } else {
            return <div className="items-center flex-shrink-0 hidden lg:flex">
                <button
                    onClick={() => {
                        history.push("/profile")
                    }}
                    className="self-center px-8 py-3 rounded">Hello ! {userLogin.taiKhoan}
                </button>
                <button
                    onClick={() => {
                        localStorage.removeItem(USER_LOGIN)
                        localStorage.removeItem(TOKEN)
                        history.push('/home')
                        window.location.reload();
                    }}
                    className="self-center px-5 py-3 mr-3 rounded border bg-black">Đăng Xuất
                </button>
            </div>
        }
    }

    const { t, i18n } = useTranslation();

    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }

    useEffect(() => {
        i18n.changeLanguage('en')
    }, [i18n])

    return (
        <header className="p-4 text-white bg-black bg-opacity-60 fixed w-full z-40">
            <div className=" flex justify-between h-16 mx-auto">
                <NavLink to="/home" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cybersoft.edu.vn/wp-content/uploads/2021/03/logo-cyber-nav.svg" alt="" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home"
                            className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white border-violet-600 "
                            activeClassName="border-b-2 border-white"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news"
                            className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white border-violet-600 "
                            activeClassName="border-b-2 border-white"
                        >
                            News
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact"
                            className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white border-violet-600"
                            activeClassName="border-b-2 border-white"
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                    <Select defaultValue="en" className="bg-black" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="vi">Việt nam</Option>
                        <Option value="en">English</Option>
                        <Option value="chi">China</Option>
                    </Select>
                </div>
            </div>
        </header>

    )
}
