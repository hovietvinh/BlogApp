const { uploadSingleFileToCloudinary } = require("../middlewares/cloudinary");
const Post = require("../models/post.model");

module.exports.create = async(req,res)=>{
    try {
        // console.log(req.body);
        const file = req.file;
        let uploadResult = null
        if (file) {
            uploadResult = await uploadSingleFileToCloudinary(file);
        }
        const imageUrl = uploadResult?.secure_url;
        // const { title, summary, content } = req.body;
        req.body.cover = imageUrl

        req.body.user = req.user._id

        const data = new Post(req.body)
        await data.save()
        res.status(200).json({
            message:"Create posts successfully!"
        })
    } catch (error) {
        res.status(400).json({
            code:400,
            message:"Error in server"
        })
    }
}

module.exports.index = async(req,res)=>{
    try {
       
        const data = await Post.find({}).populate("user").sort({ createdAt: -1 });;
        return res.status(200).json({
            data:data
        })
    } catch (error) {
        res.status(400).json({
            code:400,
            message:"Error in server"
        })
    }
}


module.exports.detail = async(req,res)=>{
    try {
       
       const {id} = req.params
       const find = {
        _id:id
       }
       const data = await Post.findOne(find).populate("user");
       res.status(200).json({
            data:data
       })
       
    } catch (error) {
        res.status(400).json({
            code:400,
            message:"Error in server"
        })
    }
}



module.exports.update = async(req,res)=>{
    try {
       
       const {id} = req.params
       const find = {
        _id:id,
        user:req.user._id
       }
       const file = req.file;
        let uploadResult = null
        if (file) {
            uploadResult = await uploadSingleFileToCloudinary(file);
        }
        const imageUrl = uploadResult?.secure_url;
        req.body.cover = imageUrl
        await Post.updateOne(find,req.body);
       
        res.status(200).json({
            message:"Update successfully!"
        })
       
    } catch (error) {
        res.status(400).json({
            code:400,
            message:"Error in server"
        })
    }
}
