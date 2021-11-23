import React, { Fragment, memo } from 'react'
import { Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;

function HomeMenu(props) {

    const { heThongRapChieu } = props

    return (
        <>
            <Tabs tabPosition='left' style={{ height: '700px' }}>
                {heThongRapChieu.map((heThongRap, index) => {
                    //load hệ thống rạp
                    return <TabPane tab={<img src={heThongRap.logo} alt="img-fluid" className="rounded-full w-12 h-12" />} key={index}>
                        <Tabs tabPosition='left'>
                            {heThongRap.lstCumRap?.map((cumRap, index) => {
                                //Load danh sách cụm rạp
                                return <TabPane tab={
                                    <div className="flex items-center w-auto">
                                        <img src={cumRap.hinhAnh} alt="img-fluid" className="h-12 inline-block mr-4" />
                                        <div className="inline-block text-left">
                                            <p className="text-black font-bold mb-0">{cumRap.tenCumRap}</p>
                                            <p className="text-gray-400 mb-0">
                                                {cumRap.diaChi.length > 30 ? <span>{cumRap.diaChi.slice(0, 30)}...</span> : cumRap.diaChi}
                                            </p>
                                            <p className="text-red-500 mb-0">Chi tiết</p>
                                        </div>
                                    </div>
                                }
                                    className="scrollFilms"
                                    key={index}
                                    style={{ overflowY: 'scroll', height: '700px' }}
                                >
                                    {/* Load danh sách phim theo cụm rạp */}
                                    {cumRap.danhSachPhim?.map((phim, index) => {
                                        return <Fragment key={index} >
                                            <div className="flex items-start my-3 px-1">
                                                <img src={phim.hinhAnh} alt="img-fluid" className="w-12 h-12 inline-block mr-4" onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/200" }} />
                                                <div className="inline-block text-left w-full">
                                                    <p className="text-black font-bold mb-0">{phim.tenPhim}</p>
                                                    <p className="text-gray-400 mb-0">
                                                        {cumRap.diaChi.length > 30 ? <span>{cumRap.diaChi.slice(0, 30)}...</span> : cumRap.diaChi}
                                                    </p>
                                                    <div className="grid grid-cols-4 gap-4">
                                                        {phim.lstLichChieuTheoPhim.slice(0, 8).map((lichChieu, index) => {
                                                            return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="text-green-500    text-base border py-2 rounded-lg bg-gray-200 text-center font-medium">
                                                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                            </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </Fragment>
                                    })}

                                </TabPane>
                            })}
                        </Tabs>
                    </TabPane>
                })}
            </Tabs >
        </>
    );
}

export default memo(HomeMenu)