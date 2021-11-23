import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUP_ID } from '../../../../util/settings/config';

const Edit = (props) => {

    const [imgSrc, setImgSrc] = useState('');

    const dispatch = useDispatch()

    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer)


    useEffect(() => {
        dispatch(layThongTinPhimAction(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            sapChieu: thongTinPhim.sapChieu,
            dangChieu: thongTinPhim.dangChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: null,
            maNhom: GROUP_ID
        },
        onSubmit: values => {
            values.maNhom = GROUP_ID
            //tạo đối tượng formdata => đưa giá trị values từ formik vào formdata
            let formData = new FormData()
            for (let key in values) {
                if (key === 'ngayKhoiChieu') {
                    formData.append(key, moment(values[key]).format('DD-MM-YYYY'))
                }
                //nếu là thuộc tính hình ảnh
                else if (key === 'hinhAnh') {
                    if (values['hinhAnh'] !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name) // 1 là dạng file , 2 là obj , 3 là tên file
                    }
                } else {
                    formData.append(key, values[key])
                }
            }
            dispatch(capNhatPhimUploadAction(formData))
        },
    });

    const handleChangeValue = (name) => {


        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        //lấy file ra từ e
        let file = e.target.files[0];
        //nếu là định dạng file hình
        if (file?.type === 'image/jpeg' || file?.type === 'image/jpg' || file?.type === 'image/gif' || file?.type === 'image/png') {
            // console.log(file)
            //tạo đối tượng để đọc file
            let reader = new FileReader();
            await formik.setFieldValue('hinhAnh', file)
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result)
                setImgSrc(e.target.result)//hình dạng base 64
            }
        }

    }

    return (
        <>
            <h3 className="text-lg">Chỉnh sửa phim</h3>
            <Form
                onAbortCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 8,
                }}
                layout="horizontal"
            >
                <Form.Item label="Tên Phim">
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input.TextArea name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker
                        format={"DD/MM/YYYY"}
                        onChange={(value) => {
                            let ngayKhoiChieu = moment(value)
                            formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
                        }}
                        value={moment(formik.values.ngayKhoiChieu)}
                    />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch name="dangChieu" onChange={handleChangeValue('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={handleChangeValue('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={handleChangeValue('hot')} checked={formik.values.hot} />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <InputNumber max='10' min='1' onChange={handleChangeValue('danhGia')} value={formik.values.danhGia} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <Input type="file" style={{ width: '300px' }} onChange={handleChangeFile} accept="image/png, image/jpeg,image/png" />
                    <img style={{ height: 100, width: 100 }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt="..." />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" onClick={formik.handleSubmit} className="bg-green-500 p-2 text-white text-base rounded-md">Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Edit