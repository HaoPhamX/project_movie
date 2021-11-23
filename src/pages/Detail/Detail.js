import React, { useEffect, useRef } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.css'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layChiTietPhimAction } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;

export default function Detail(props) {

    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer)
    

    const muaVeRef = useRef('')


    const dispatch = useDispatch();


    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layChiTietPhimAction(id))
    }, [dispatch, props.match.params])

    return (
        <>
            <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, minHeight: '100vh', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                <CustomCard
                    style={{ minHeight: '100vh', paddingTop: '150px' }}
                    effectColor="#fff" // required
                    color="#fff" // default color is white
                    blur={20} // default blur value is 10px
                    borderRadius={0} // default border radius value is 10px
                >
                    <div className="grid grid-cols-12">
                        <div className="col-span-4 col-start-4 flex items-center">
                            <img src={filmDetail.hinhAnh} style={{ width: 200, height: 300 }} alt="" />
                            <div className="ml-5">
                                <p className="text-white text-sm">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <h3 className="text-white text-2xl">{filmDetail.tenPhim}</h3>
                                <p className="text-white text-sm">124 phút - 0 IMDb - 2D/Digital</p>
                                <button
                                    onClick={() => { muaVeRef.current.scrollIntoView({ behavior: 'smooth' }) }}
                                    type="button" className="px-8 py-3 font-semibold rounded text-white" style={{ backgroundColor: '#fb4226' }}>Mua vé</button>
                            </div>
                        </div>
                        <div className="col-span-4 flex flex-col items-center justify-center">
                            <div className="mb-5">
                                <Rate value={filmDetail.danhGia / 2} />
                            </div>
                            <div className={`c100 p${filmDetail.danhGia * 10} big green`}>
                                <span>{filmDetail.danhGia * 10}%</span>
                                <div className="slice">
                                    <div className="bar" />
                                    <div className="fill" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="muave" ref={muaVeRef} style={{ width: 940, margin: '100px auto', backgroundColor: 'white', borderRadius: '10px' }}>
                        <Tabs defaultActiveKey="1" centered>

                            <TabPane tab={<p className="text-black m-0 font-bold text-base">Lịch Chiếu</p>} key="1">
                                {filmDetail.heThongRapChieu?.length
                                    ?
                                    <Tabs tabPosition='left'>
                                        {
                                            filmDetail.heThongRapChieu?.map((rap, index) => {

                                                return <TabPane tab={
                                                    <div className="flex items-center">
                                                        <img src={rap.logo} alt={rap.maHeThongRap} style={{ width: 50, height: 50 }} />
                                                        <p className="mb-0 text-black ml-3">{rap.tenHeThongRap}</p>
                                                    </div>
                                                }
                                                    key={index}
                                                >
                                                    {rap.cumRapChieu?.map((phim, index) => {
                                                        return <div key={index} className="mb-5">
                                                            <div key={index} className="flex mb-3">
                                                                <img src={phim.hinhAnh} alt={phim.hinhAnh} style={{ width: 50, height: 50 }} />
                                                                <div className="ml-3">
                                                                    <p className="text-green font-bold mb-0">{phim.tenCumRap}</p>
                                                                    <p className="text-gray-500 mb-0">{phim.diaChi}</p>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-5">
                                                                {phim.lichChieuPhim?.slice(0, 10).map((lichChieu, index) => {
                                                                    return <NavLink key={index} to={`/checkout/${lichChieu.maLichChieu}`} type="button" className="mr-2 text-center py-2 text-xl text-green-500 font-semibold rounded-xl text-coolGray-100" style={{ backgroundColor: 'rgba(246,246,246,.5)' }}>
                                                                        {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                    </NavLink>
                                                                })}
                                                            </div>
                                                        </div>
                                                    })}
                                                </TabPane>

                                            })

                                        }

                                    </Tabs>
                                    :
                                    <p className="text-center text-xl">Không có xuất chiếu</p>
                                }
                            </TabPane>

                            <TabPane tab={<p className="text-black m-0 font-bold text-base">Thông tin</p>} key="2">

                            </TabPane>
                            <TabPane tab={<p className="text-black m-0 font-bold text-base">Đánh Giá</p>} key="3">

                            </TabPane>

                        </Tabs>
                    </div>
                </CustomCard>

            </div >
        </>

    )
}
