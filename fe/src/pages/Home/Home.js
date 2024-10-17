import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Post from '../../components/Post/Post';
import { getPostsApi } from '../../utils/api';
function Home() {
    const [data,setData] = useState([])

    const fetch = async()=>{

        
        const res = await getPostsApi();
        if(res.status==200){
            const dataRes = await res.json();
            setData(dataRes.data)
        }else{
            toast.error("Failed to load data!")
        }
    }

    useEffect(()=>{
        fetch()
    },[])

    return (
        <>  
        
            <div className="spin-wrapper">
                <Spin spinning={data.length === 0} tip="Waiting...">
                
                </Spin>
            </div>

            {/* Display posts when data is available */}
            {data.length > 0 && data.map(item => (
                <Post data={item} key={item._id} />
            ))}
            
        </>
    );
}

export default Home;