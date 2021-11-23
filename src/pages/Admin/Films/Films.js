import React, { useEffect } from 'react'
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { history } from '../../../App'

const { Search } = Input;

export default function Films(props) {

    const { arrFilmDefaul } = useSelector(state => state.QuanLyPhimReducer)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [dispatch])


    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            width: 100,

        },
        {
            title: 'Hình Ảnh ',
            dataIndex: 'hinhAnh',
            render: (text, record, index) => {
                return <img src={record.hinhAnh} style={{ width: 50, height: 50 }} alt={record.tenPhim} />
            },
            width: 100
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim()
                let tenPhimB = b.tenPhim.toLowerCase().trim()
                if (tenPhimA < tenPhimB) {
                    return -1
                }
                if (tenPhimA > tenPhimB) {
                    return 1
                }
                return 0
            },
            width: 300
        },
        {
            title: 'Mô Tả',
            dataIndex: 'moTa',
            width: 400,
        },
        {
            title: 'Ngày Khởi Chiếu',
            render: (text, record, index) => {
                return <span>{moment(record.ngayKhoiChieu).format("DD/MM/YYYY")}</span>
            },
            sorter: (a, b) => {
                return new Date(a.ngayKhoiChieu) - new Date(b.ngayKhoiChieu)
            },
            width: 150
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return <div>
                    <NavLink key={1} className=" text-green-500 text-xl mr-5" to={`/admin/films/edit/${record.maPhim}`}><EditOutlined /></NavLink>
                    <span onClick={() => {
                        if (window.confirm('Bạn có chắc muốn xóa phim' + record.tenPhim)) {
                            dispatch(xoaPhimAction(record.maPhim))
                        }
                    }}
                        key={2} className=" text-red-500  text-xl cursor-pointer mr-5"><DeleteOutlined />
                    </span>
                    <NavLink key={3} className=" text-blue-500 text-xl " to={`/admin/films/showtime/${record.maPhim}`}><CalendarOutlined /></NavLink>
                </div>
            },
        },

    ];
    return (
        <div>
            <h3 className="text-4xl mb-5">Quản Lý Phim</h3>
            <button onClick={() => {
                history.push('/admin/flims/addnew')
            }}
                className="mb-5 bg-green-500 py-3 px-2 rounded-lg text-center text-black text-sm font-semibold" to="/addnew">Thêm phim</button>
            <Search className="mb-5" placeholder="input search text"
                onSearch={(value) => {
                    dispatch(layDanhSachPhimAction(value))
                }}
                enterButton />
            <Table columns={columns} dataSource={arrFilmDefaul} pagination={{ pageSize: 5 }} rowKey='maPhim' />
        </div>
    )
}
