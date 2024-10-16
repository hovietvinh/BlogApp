import { Button, Form, Input, Upload, Spin } from 'antd';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPostApi } from '../../utils/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

function Create() {
    const [form] = Form.useForm();
    const [disableButton, setDisableButton] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (info) => {
        setFileList(info.fileList.slice(-1));
    };

    const handleFinish = async (values) => {
        setDisableButton(true); 
        const formData = new FormData();

        // Append other form values
        formData.append('title', values.title);
        formData.append('summary', values.summary);
        formData.append('content', values.content); 

        // Append the file
        if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj);
        }

        const res = await createPostApi(formData);
        if (res.status === 200) {
            const data = await res.json();
            toast.success(data.message);
            navigate("/");
        } else {
            const data = await res.json();
            toast.error(data.message);
        }

        setDisableButton(false); 
    };

    return (
        <Spin spinning={disableButton} tip="Creating post..." > 
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
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                {/* ReactQuill for the content */}
                <Form.Item name="content">
                    <ReactQuill value={content} onChange={value => setContent(value)} modules={modules} formats={formats} />
                </Form.Item>

                <Form.Item>
                    <button
                        disabled={disableButton}
                        className={disableButton ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        Create post
                    </button>
                </Form.Item>
            </Form>
        </Spin>
    );
}

export default Create;
