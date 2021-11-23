import React, { useEffect, useState } from 'react'
import { Table, Input, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { history } from '../../../App'
import { quanlyNguoiDungService } from '../../../services/QuanLyNguoiDung';
import { STATUS_CODE, USER_EDIT } from '../../../util/settings/config';
import Swal from 'sweetalert2';



const { Search } = Input;

export default function DashBoard(props) {

    const [state, setState] = useState({
        danhSachNguoiDung: []
    })



    const layDanhSachNguoiDung = async () => {
        try {
            const { data, status } = await quanlyNguoiDungService.layDanhSachNguoiDung()
            if (status === STATUS_CODE.SUCCESS) {
                setState({
                    danhSachNguoiDung: data.content
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        layDanhSachNguoiDung()
    }, [])

    const handleSearch = async (values) => {
        try {
            const { data, status } = await quanlyNguoiDungService.layDanhSachNguoiDung(values)
            if (status === STATUS_CODE.SUCCESS) {
                setState({
                    danhSachNguoiDung: data.content
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDeleteUser = async (taiKhoan) => {
        try {
            const { status } = await quanlyNguoiDungService.xoaNguoiDung(taiKhoan)
            if (status === STATUS_CODE.SUCCESS) {
                layDanhSachNguoiDung()
            }
        }
        catch (err) {
            console.log(err.response?.data)
            Swal.fire({
                icon: 'error',
                title: err.response?.data.content,
                timer: 1000
            })
        }
    }


    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            width: 200,

        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            width: 250,
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            width: 200
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            width: 200
        },
        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            width: 200,
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return <div>
                    <NavLink
                        onClick={() => {
                            localStorage.setItem(USER_EDIT, JSON.stringify(record))
                        }}
                        key={1} className=" text-green-500 text-xl mr-5" to={`/admin/users/edituser/${record.taiKhoan}`}><EditOutlined /></NavLink>
                    <Popconfirm
                        title="Bạn có chắc chắn xóa chứ!"
                        onConfirm={() => { handleDeleteUser(record.taiKhoan); }}
                        okText="Yes"
                        cancelText="No"
                        key={2}
                    >
                        <span className=" text-red-500  text-xl cursor-pointer mr-5">
                            <DeleteOutlined />
                        </span>
                    </Popconfirm>
                </div>
            },
        },

    ];
    return (
        <div>
            <h3 className="text-4xl mb-5">Quản người dùng</h3>
            <button onClick={() => {
                localStorage.removeItem(USER_EDIT)
                history.push('/admin/users/adduser')
            }}
                className="mb-5 bg-green-500 py-3 px-2 rounded-lg text-center text-white text-sm font-semibold" to="/addnew">Thêm người dùng</button>
            <Search className="mb-5" placeholder="input search text"
                onSearch={handleSearch}
                enterButton />
            <Table columns={columns} dataSource={state.danhSachNguoiDung} pagination={{ pageSize: 5 }} rowKey='taiKhoan' />
        </div>
    )
}
