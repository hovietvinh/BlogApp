import { Button, Form, Input, Upload, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { updatePostApi, detailPostApi } from '../../utils/api';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import Quill from "../../components/Quill/Quill"

function Edit() {
    const [form] = Form.useForm();
    const [disableButton, setDisableButton] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const fetch = async () => {
        const res = await detailPostApi(id);
        if (res.status === 200) {
            const data = await res.json();
            setPost(data.data);
        } else {
            toast.error("Failed in server!");
        }
    };

    useEffect(() => {
        fetch();
    }, [id]);

    const init = () => {
        if (post) {
            setContent(post.content)
            form.setFieldsValue(post);

        }
    };

    useEffect(() => {
        init();
    }, [post]);

    const handleFileChange = (info) => {
        setFileList(info.fileList.slice(-1)); // Allow only 1 file
    };

    const handleFinish = async (values) => {
        // setDisableButton(true);
        const formData = new FormData();

        // Append form values
        formData.append('title', values.title);
        formData.append('summary', values.summary);
        formData.append('content', content);

        // Append the file if it exists
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('file', fileList[0].originFileObj);
        }

       

        const res = await updatePostApi(formData,id);
        console.log(res);
        if (res.status === 200) {
            const data = await res.json()
            toast.success(data.message);
            setDisableButton(false);
            navigate("/");
        } else {
            setDisableButton(false)
            const data = await res.json();
            toast.error(data.message);
        }

        
    };

    return (
        <Spin spinning={disableButton || !post } tip=" waiting...">
            <Form onFinish={handleFinish} form={form}>
                <Form.Item name={"title"}>
                    <Input placeholder='Title' />
                </Form.Item>
                <Form.Item name={"summary"}>
                    <Input placeholder='Summary' />
                </Form.Item>
                <Form.Item
                    label="Upload File"
                    name="file"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e && e.fileList}
                >
                    <Upload
                        beforeUpload={() => false} // Prevent automatic upload
                        onChange={handleFileChange}
                        maxCount={1}
                        fileList={fileList}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                {/* ReactQuill for the content */}
                <Form.Item name="content">
                    <Quill content={content} setContent={setContent}/>
                </Form.Item>

                <Form.Item>
                    <button
                        disabled={disableButton}
                        className={disableButton ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        Edit post
                    </button>
                </Form.Item>
            </Form>
        </Spin>
    );
}

export default Edit;
