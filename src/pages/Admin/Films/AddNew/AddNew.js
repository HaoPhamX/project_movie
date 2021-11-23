import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
    Form,
    Input,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUpLoadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUP_ID } from '../../../../util/settings/config';

const AddNew = () => {

    const [imgSrc, setImgSrc] = useState('');

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            sapChieu: '',
            hot: false,
            danhGia: '',
            hinhAnh: {},
            maNhom: GROUP_ID
        },
        onSubmit: values => {
            values.maNhom = GROUP_ID
            //tạo đối tượng formdata => đưa giá trị values từ formik vào formdata
            let formData = new FormData()
            for (let key in values) {
                //nếu là thuộc tính hình ảnh
                if (key === 'hinhAnh') {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name) // 1 là dạng file , 2 là obj , 3 là tên file
                } else {
                    formData.append(key, values[key])
                }
            }
            // console.log('formData',formData.get('File'))
            //gọi api gửi các giá trị formdata lên backend xử lý
            dispatch(themPhimUpLoadHinhAction(formData))

        },
    });

    const handleChangeValue = (name) => {


        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = (e) => {
        //lấy file ra từ e
        let file = e.target.files[0];
        //nếu là định dạng file hình
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            // console.log(file)
            //tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result)
                setImgSrc(e.target.result)//hình dạng base 64
            }
            formik.setFieldValue('hinhAnh', file)
        }

    }

    return (
        <>
            <h3 className="text-lg">Thêm mới phim</h3>
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
                    <Input name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input.TextArea name="moTa" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker
                        format={"DD/MM/YYYY"}
                        onChange={(value) => {
                            let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
                            formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
                        }}
                    />
                </Form.Item>
                <Form.Item label="Đang chiếu" valuePropName="checked">
                    <Switch name="dangChieu" onChange={handleChangeValue('dangChieu')} />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={handleChangeValue('sapChieu')} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={handleChangeValue('hot')} />
                </Form.Item>
                <Form.Item label="Đánh giá">
                    <InputNumber max='10' min='1' onChange={handleChangeValue('danhGia')} />
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <Input type="file" style={{ width: '300px' }} onChange={handleChangeFile} accept="image/png, image/jpeg,image/png" />
                    <img style={{ height: 100, width: 100 }} src={imgSrc} alt="..." />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" onClick={formik.handleSubmit} className="bg-green-500 p-2 text-white text-base rounded-md">Thêm phim</button>
                </Form.Item>
            </Form>
        </>
    );
};
export default AddNew