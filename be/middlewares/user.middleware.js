const jwt=  require("jsonwebtoken")
const env = require("dotenv")
env.config()

module.exports.check = async(req,res,next)=>{
    try {
        const {token} = req.cookies
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        if (decoded){
            req.user = decoded
            next()
        }

    } catch (error) {
        res.status(400).json({
            code:400,
            message:"Error in server"
        })
    }
}