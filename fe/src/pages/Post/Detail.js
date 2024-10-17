import React, { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import { detailPostApi } from '../../utils/api';
import toast from "react-hot-toast"
import { formatISO9075 } from 'date-fns';
import {useSelector} from "react-redux"
import { FaRegEdit } from "react-icons/fa";
import { Spin } from 'antd';

function Detail() {
    const {id} = useParams()
    const [post,setPost] = useState(null)
    const stateAuth = useSelector(state=>state.UserReducer);
    const fetch = async()=>{
        const res = await detailPostApi(id)
        if(res.status==200){
            const data = await res.json()
            setPost(data.data)
        }
        else{
            toast.error("Failed in server!")
        }
    }
    useEffect(()=>{
        fetch()
    },[id])
    return (
        <>
        
            <div className="spin-wrapper">
                <Spin spinning={!post} tip="Waiting...">
                
                </Spin>
            </div>

            {post && (
                <div className='post-page'>
                    <h1 className=''>{post.title}</h1>
                    <time>{formatISO9075(new Date(post.createdAt))}</time>
                    <div className='author'>{post.user.username}</div>
                    {stateAuth.userInfo.username=== post.user.username && (
                        <>
                            
                            <div className='edit-row'>
                                

                                <Link to={"/posts/edit/"+post._id}><FaRegEdit /> Edit this post</Link>
                            </div>
                        </>
                    )}

                    <div className='image'>
                        <img src={post.cover}/>
                    </div>

                    
                    
                    <div className='content' dangerouslySetInnerHTML={{__html:post.content}}></div>
                </div>
            )}
        </>
    );
}

export default Detail;