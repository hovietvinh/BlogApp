import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { registerUserApi } from '../../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate = useNavigate()
    const [disableButton,setDisableButton] = useState(false)
    const [form] = Form.useForm()

    const handleRegister = async(e)=>{
        form.resetFields()
        setDisableButton(true)
        const res = await registerUserApi(e)
        if(res.status==200){
            const data = await res.json()
            toast.success(data.message)
            setDisableButton(false)
            navigate("/login")
        }
        else{
            const data = await res.json()
            toast.error(data.message)
            setDisableButton(false)

        }
        
    }

    return (
        <>
            
            <Form onFinish={handleRegister} form={form} className='form'>
                <h1>Register</h1>
                <Form.Item name="username">
                    <Input placeholder='username'/>
                </Form.Item>
                <Form.Item name="password">
                    <Input.Password placeholder='password'/>
                </Form.Item>

                <Form.Item>
                    <button disabled={disableButton} className={disableButton?'disable':''} htmltype="submit">Register</button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Register;