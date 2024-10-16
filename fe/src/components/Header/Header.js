import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserAction } from '../../redux/actions/UserAction';
import { getProfileUserApi } from '../../utils/api';

function Header() {
    const checkObject = (obj)=>{
        return Object.keys(obj).length !== 0;
    }
    const dispatch = useDispatch()
    const stateUser = useSelector(state=>state.UserReducer)
    const fetch = async()=>{
        const res = await getProfileUserApi();

        if(res.status==200){
            const data = await res.json();
            dispatch(setUserAction(data.data))
        }
    }
    useEffect(()=>{
        fetch()
    },[dispatch])
    // console.log(stateUser.userInfo?true:false)
    const handleLogout = ()=>{
        dispatch(setUserAction({}))
    }
    return (
        <>
            <header>
                <Link className="logo" to="/">MyBlog</Link>
                <nav>
                    {!checkObject(stateUser.userInfo)? (
                        <>
                            <Link className="" to='/login'>Login</Link>
                            <Link className="" to="/register">Register</Link>
                        </>
                    ):(
                        <>
                            <Link className="" to='/posts/create'>Create new post</Link>
                            <a className='cursor-pointer' onClick={handleLogout}>Logout</a>
                        </>

                    )}
                   
                
                </nav>
            </header>
        </>
    );
}

export default Header;