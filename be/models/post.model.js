const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{
        type:String,

    },
    summary:{
        type:String,

    },
    content:{
        type:String,
    },
    cover:String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

},{
    timestamps:true
})



const Post = mongoose.model("Post",postSchema,"posts")

module.exports = Post 