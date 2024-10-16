import React from 'react';
import { Form, Input } from 'antd';
import { loginUserApi } from '../../utils/api';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../redux/actions/UserAction';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const handleLogin = async(e)=>{
        const res = await loginUserApi(e)
        if(res.status==200){
            const data = await res.json();
            dispatch(setUserAction(data.data))
            toast.success(data.message)
            navigate("/")
        }
        else{
            const data = await res.json();
            toast.error(data.message)
        }
    }
    return (
        <>
            
            <Form onFinish={handleLogin} className='formLogin'>
                <h1>Login</h1>
                <Form.Item name={"username"}>
                    <Input placeholder='username'/>
                </Form.Item>
                <Form.Item name={"password"}>
                    <Input.Password placeholder='password'/>
                </Form.Item>

                <Form.Item>
                    <button htmltype="submit">Login</button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;