const User = require("../models/user.model")
const md5 = require("md5")
const jwt = require("jsonwebtoken")
const env = require("dotenv")
env.config()
module.exports.register = async(req,res)=>{
    try {
        const exist =await User.findOne({
            deleted:false,
            username:req.body.username
        })
        if(exist){
            // console.log(exist);
            return res.status(400).json({
                message:"Username already exists!"
            })
        }
        req.body.password = md5(req.body.password)
        const data = new User(req.body)
        await data.save();
        // console.log(data);
        return res.status(200).json({
            message:"Register successfully!"
        })
    } catch (error) {
        res.status(400).json({
            code:400,
            message:"Error in server"
        })
    }
}

module.exports.login = async(req,res)=>{
    try {
        req.body.password = md5(req.body.password)
        const exist =await User.findOne({
            deleted:false,
            username:req.body.username,
            password:req.body.password
        })
        if(!exist){
            return res.status(400).json({
                message:"User/password not correct!"
            })
        }

        else{
            const payload = {
               username:exist.username,
               _id:exist._id             
            }
   
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE   
                }
            )
            res.cookie("token",token).json({
                message:"Login successfully!",
                data:payload
            })
        }
        
    } catch (error) {
        res.status(400).json({
            
            message:"Error in server"
        })
    }
}

module.exports.profile = async(req,res)=>{
    try {
        const {token} = req.cookies
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
        return res.status(200).json({
            data:decoded
        })

    } catch (error) {
        res.status(400).json({
            code:400,
            message:"Error in server"
        })
    }
}
