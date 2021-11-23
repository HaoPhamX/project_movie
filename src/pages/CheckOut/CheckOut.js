import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash';
import { Tabs } from 'antd';
import styles from './CheckOut.module.css'
import { datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import './Ghe.css'
import { CHON_GHE, CHUYEN_TAB_DAT_VE } from '../../redux/types/QuanLyDatVeType/QuanLyDatVeType';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { layThongTinTaiKhoan } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { history } from '../../App';
import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { NavLink } from 'react-router-dom';

function CheckOut(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer)
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe


    const dispatch = useDispatch()
    useEffect(() => {
        const { id } = props.match.params
        dispatch(layChiTietPhongVeAction(id))
    }, [dispatch, props.match.params])



    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {


            let classGheVip = (ghe.loaiGhe === 'Vip' && !ghe.daDat) ? 'gheVip' : ''


            let classGheDaDat = ghe.taiKhoanNguoiDat === userLogin.taiKhoan ? 'gheBanDaDat' : ghe.daDat ? 'gheDaDat' : ''

            let indexGheKD = danhSachGheKhachDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)

            let classGheKhachDat = ''
            if (indexGheKD !== -1) {
                classGheKhachDat = 'gheKhachDangDat'
            } else {
                classGheKhachDat = ''
            }

            let indexGheDD = danhSachGheDangDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe)


            if (indexGheDD !== -1) {
                classGheDaDat = 'gheDangDat'
            }

            return <Fragment key={index}>
                <button onClick={() => {
                    let index = danhSachGheDangDat?.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
                    if (danhSachGheDangDat.length > 9 && index === -1) {
                        alert('Vui lòng không chọn quá 10 ghế')
                    }
                    else {
                        dispatch({
                            type: CHON_GHE,
                            gheDuocChon: ghe
                        })
                    }
                }}
                    className={`ghe ${classGheVip} ${classGheDaDat} ${classGheKhachDat}`}
                >
                    {ghe.daDat ? classGheDaDat !== 'gheBanDaDat' ? <i className="fa fa-times"></i> : <i className="fa fa-user-check"></i> : classGheKhachDat !== '' ? <i className="fa fa-user-lock"></i> : ghe.tenGhe}
                </button>
                {(index + 1) % 16 === 0 ? <hr /> : ''}
            </Fragment>
        })
    }

    return (
        <div className="grid grid-cols-12 px-2">
            <div className="col-span-8 ">
                <div className="flex items-center justify-center flex-col mt-10 container">
                    <div className="bg-black w-full h-2"></div>
                    <div className={`${styles.trapezoid}`} >
                        <h3 className="text-center mb-0">Màn Hình</h3>
                    </div>
                    <div className='mt-10'>
                        {renderSeats()}
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="mr-4 flex items-center flex-col">
                            <div className="ghe gheDaDat text-center"><i className="fa fa-times" style={{ lineHeight: '35px' }}></i></div><span>Ghế đã có người đặt</span>
                        </div>
                        <div className="mr-4 flex items-center flex-col">
                            <div className="ghe gheDangDat"></div><span>Ghế đang đặt</span>
                        </div>
                        <div className="mr-4 flex items-center flex-col">
                            <div className="ghe gheVip"></div><span>Ghế Vip</span>
                        </div>
                        <div className="mr-4 flex items-center flex-col">
                            <div className="ghe gheBanDaDat text-center "><i className="fa fa-user-check" style={{ lineHeight: '35px' }}></i></div><span>Ghế bạn đã đặt</span>
                        </div>
                        <div className="mr-4 flex items-center flex-col">
                            <div className="ghe gheKhachDangDat text-center "> <i className="fa fa-user-lock" style={{ lineHeight: '35px' }}></i></div><span>Ghế khách đang đặt</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-4" style={{
                backgroundColor: '#fff', boxShadow: '0 0 15px rgb(0 0 0 / 30%)', position: 'absolute', right: '0', top: '100px', bottom: '0', width: '440px'
            }} >

                <div className="py-3 px-8 h-3/4">
                    <h3 className="text-green-400 text-center text-4xl">{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                        return tongTien += ghe.giaVe
                    }, 0).toLocaleString()} đ</h3>
                    <hr />
                    <div className="flex items-center">
                        <span className="p-1 px-2 bg-red-500 text-white rounded-lg mr-2">C16</span>
                        <h3 className="text-2xl  mt-2">{thongTinPhim.tenPhim}</h3>
                    </div>
                    <p className="mb-1 text-base">{thongTinPhim.diaChi}</p>
                    <p className="mb-1 text-base">Ngày chiếu {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} - {thongTinPhim.tenRap}</p>
                    <hr />
                    <div className="flex flex-row mt-2 text-lg">
                        <div className="text-red-500 font-normal w-3/5 flex flex-wrap">
                            Ghế

                            {_.sortBy(danhSachGheDangDat, [(o) => Number(o.tenGhe)]).map((gheDD, index) => {
                                return <span key={index} className="mx-1 text-green-500">
                                    {gheDD.tenGhe}
                                </span>
                            })}

                        </div>
                        <div className="text-right text-green-500 font-semibold w-2/5">
                            {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                return tongTien += ghe.giaVe
                            }, 0).toLocaleString()} đ
                        </div>
                    </div>
                    <hr />
                    <small>Email</small>
                    <input defaultValue={userLogin.email} className="py-3" name="email" placeholder="Email" style={{ width: '100%', outline: 'none' }} />
                    <hr />
                    <small>Họ tên</small>
                    <input className="py-3" defaultValue={userLogin.hoTen} name="hoTen" placeholder="Phone" style={{ width: '100%', outline: 'none' }} />
                    <hr />
                    <small className="mt-2">Mã giảm giá</small>
                    <input className="py-3" placeholder="Nhập tại đây" style={{ width: '100%', outline: 'none' }} />
                    <hr />
                    <div style={{ cursor: 'pointer' }}>
                        <h3 className="text-lg mt-2">Hình thức thanh toán</h3>
                        <p className="text-red-600 text-sm">Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp</p>
                    </div>

                </div>
                <div className="flex items-end h-1/4">
                    {danhSachGheDangDat.length === 0
                        ?
                        <button
                            style={{ pointerEvents: 'none' }}
                            className="w-full bg-gray-500 p-5 text-white text-4xl  transition-all duration-300"  >ĐẶT VÉ</button>
                        :
                        <button onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe()
                            thongTinDatVe.maLichChieu = props.match.params.id
                            thongTinDatVe.danhSachVe = danhSachGheDangDat

                            dispatch(datVeAction(thongTinDatVe))
                        }}

                            className="w-full  p-5 text-white text-4xl bg-green-500 transition-all duration-300"  >ĐẶT VÉ</button>
                    }
                </div>
            </div>
        </div >
    )
}

const { TabPane } = Tabs;


export default function CheckOutTab(props) {

    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer)

    const dispatch = useDispatch()

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        return () => {
            dispatch({
                type: CHUYEN_TAB_DAT_VE,
                key: '1'
            })
        }
    }, [dispatch])

    const operations = <Fragment>
        {!_.isEmpty(userLogin)
            ?
            <div onClick={() => {
                history.push('/profile')
            }} className="flex items-center cursor-pointer">
                Hello !  <span className="font-bold ml-2 text-xl"> {userLogin.taiKhoan}</span>
                <div style={{ width: 50, height: 50, lineHeight: '50px' }} className="ml-3 rounded-full bg-red-200 text-center">
                    {userLogin.taiKhoan.substr(0, 1)}
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem(USER_LOGIN)
                        localStorage.removeItem(TOKEN)
                        history.push('/home')
                        window.location.reload();
                    }}
                    className="bg-green-500 border px-3 py-2 text-white ml-5">Đăng xuất</button>
            </div>
            : ''}
    </Fragment>

    return <div className="px-5 py-2">
        <Tabs className="" tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
            dispatch({
                type: CHUYEN_TAB_DAT_VE,
                key
            })
        }}>
            <TabPane
                tab={<NavLink className="font-bold text-2xl text-white border py-2 px-3 bg-black" to="/home">Home</NavLink>}
                key='3'
            >
            </TabPane>
            <TabPane
                tab="01 Chọn ghế & Thanh toán" key="1">
                <CheckOut {...props} />
            </TabPane>
            <TabPane
                tab="02 Kết quả đặt vé" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>
}

function KetQuaDatVe(props) {

    const dispatch = useDispatch()

    const { thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer)

    useEffect(() => {
        dispatch(layThongTinTaiKhoan())
    }, [dispatch])

    return <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="text-4xl font-medium title-font mb-4 text-green-600 tracking-widest">Lịch sử đặt vé</h1>
            </div>
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
        </div>
    </section>

}
