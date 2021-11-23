import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router'

import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import { history } from '../../App';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';


const { Header, Content, Footer, Sider } = Layout;

export default function AdminTemplate(props) {

    const { Component, ...resProps } = props

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        return <Redirect to='/home' />
    }
    return (
        <Route {...resProps} render={(propsRoute) => {
            return <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <img className="mb-5" src="https://cybersoft.edu.vn/wp-content/uploads/2021/03/logo-cyber-nav.svg" alt="" />
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="Flims">
                            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                                <NavLink to="/admin/flims">Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                                <NavLink to="/admin/flims/addnew">Add fLims</NavLink>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="flex justify-end items-center" style={{ padding: 0, backgroundColor: 'white' }}>
                        <div
                            onClick={() => {
                                history.push('/profile')
                            }}
                            className="cursor-pointer rounded-full bg-red-300 text-center text-2xl" style={{ width: '50px', height: '50px', lineHeight: '50px' }}>
                            {userLogin.hoTen.substr(0, 1).toUpperCase()}
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem(USER_LOGIN)
                                localStorage.removeItem(TOKEN)
                                history.push('/home')
                                window.location.reload();
                            }}

                            className="mx-5 font-bold">
                            Đăng Xuất
                        </button>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 555 }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Xuân Hào</Footer>
                </Layout>
            </Layout>
        }}>

        </Route>
    )
}
