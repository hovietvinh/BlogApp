const mongoose = require('mongoose')
const env = require("dotenv")
env.config()

module.exports.connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connect success");
    } catch (error) {
        console.log("connect error");
    }
}