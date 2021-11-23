import React, { useEffect, useState } from 'react'
import { Form, Button, Select, InputNumber, DatePicker } from 'antd';
import { quanLyRapService } from '../../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../../services/QuanLyDatVeService';
import { STATUS_CODE } from '../../../../util/settings/config';
import { history } from '../../../../App'

const { Option } = Select;


export default function ShowTime(props) {

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        onSubmit: async (values) => {
            console.log(values)
            try {

                const { status } = await quanLyDatVeService.taoLichChieu(values)
                if (status === STATUS_CODE.SUCCESS) {
                    alert('Tạo lịch chiếu thành công')
                    history.push('/admin/flims')
                }

            } catch (err) {
                console.log(err)
            }
        }
    })

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })

    useEffect(() => {
        async function layThongTinHeThongRap() {
            try {
                const result = await quanLyRapService.layThongTinHeThongRap();
                setState({
                    ...state,
                    heThongRapChieu: result.data.content
                });

            } catch (err) {
                console.log(err);
            }
        }
        layThongTinHeThongRap()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeHeThongRap = async (values) => {
        try {
            const { data } = await quanLyRapService.layThongTinCumRap(values)
            setState({
                ...state,
                cumRapChieu: data.content
            })

        } catch (err) {
            console.log(err)
        }
    }

    const handleChangeCumRap = (values) => {
        formik.setFieldValue('maRap', values)
    }
    // HH sẽ lấy theo múi giờ 24h còn hh lấy theo mũi giờ 12h
    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY HH:mm:ss'))
    }

    const handleChangGiaVe = (values) => {
        formik.setFieldValue('giaVe', values)
    }

    return (
        <>
            <h3 className="text-xl mb-5">Tạo lịch chiếu</h3>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                onSubmitCapture={formik.handleSubmit}
            >
                <Form.Item
                    label="Hệ thống rạp"
                >
                    <Select
                        style={{ width: 200 }}
                        onChange={handleChangeHeThongRap}
                        defaultValue='disabled'
                    >
                        <Option value="disabled" disabled>Chọn hệ thống rạp</Option>
                        {state.heThongRapChieu?.map((htr, index) => {
                            return <Option key={index} value={htr.maHeThongRap}>{htr.tenHeThongRap}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Cụm Rạp"
                >
                    <Select
                        defaultValue="disabled" style={{ width: 200 }}
                        onChange={handleChangeCumRap}
                    >
                        <Option value="disabled" disabled>Chọn cụm rạp</Option>
                        {state.cumRapChieu.map((rap, index) => {
                            return <Option key={index} value={rap.maCumRap}>{rap.tenCumRap}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Ngày chiếu giờ chiếu"
                >
                    {/* HH sẽ lấy theo múi giờ 24h còn hh lấy theo mũi giờ 12h */}
                    <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime onChange={onOk} onOk={onOk} />
                </Form.Item>
                <Form.Item
                    label="Giá vé"
                >
                    <InputNumber min={75000} max={150000} onChange={handleChangGiaVe} />
                </Form.Item>
                <Form.Item
                    label="Chức năng"
                >
                    <Button type="primary" htmlType="submit">
                        Tạo lịch chiếu
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
