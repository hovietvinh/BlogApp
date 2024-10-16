const url = "http://localhost:4000"



const registerUserApi = async(data)=>{
    try{
        const res = fetch(url+"/api/users/register",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            }
        })
        return res
    }
    catch(e){
        return {
            code:400,
            message:"Error in fetch"
        }
    }
}

const loginUserApi = async(data)=>{
    try {
        const res = fetch(url +"/api/users/login",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-type":"application/json"
            },
            credentials:"include"
        })
        return res;
    } catch (error) {
        return {
            code:400,
            message:"Error in fetch"
        }
    }
}

const getProfileUserApi = async()=>{
    try {
        const res  = await fetch(url+"/api/users/profile",{
            method:"get",
            credentials:"include"
        })
        return res;
    } catch (error) {
        return {
            code:400,
            message:"Error in fetch"
        }
    }
}

const createPostApi = async(data)=>{
    try {
        const res  = await fetch(url+"/api/posts/create",{
            method:"post",
            credentials:"include",
            body:data,
           
        })
        return res;
    } catch (error) {
        return {
            code:400,
            message:"Error in fetch"
        }
    }
}
const getPostsApi  = async ()=>{
    try {
        const res = await fetch(url+"/api/posts");
        return res;
    } catch (error) {
        return {
            code:400,
            message:"Error in fetch"
        }
    }
}

export {
    registerUserApi,
    loginUserApi,
    getProfileUserApi,
    createPostApi,
    getPostsApi
}