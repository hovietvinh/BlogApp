import React from 'react';
import { Form, Input } from 'antd';
import { loginUserApi } from '../../utils/api';
import { toast } from 'react-hot-toast';

function Login() {
    const handleLogin = async(e)=>{
        const res = await loginUserApi(e)
        if(res.status==200){
            const data = await res.json();
            toast.success(data.message)
        }
        else{
            const data = await res.json();
            toast.error(data.message)
        }
    }
    return (
        <>
            
            <Form onFinish={handleLogin} className='form'>
                <h1>Login</h1>
                <Form.Item name={"username"}>
                    <Input placeholder='username'/>
                </Form.Item>
                <Form.Item name={"password"}>
                    <Input placeholder='password'/>
                </Form.Item>

                <Form.Item>
                    <button htmltype="submit">Login</button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;