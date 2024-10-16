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


export {
    registerUserApi,
    loginUserApi,
}