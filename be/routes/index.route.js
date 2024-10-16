const userRoutes = require("./user.route")
const postRoutes = require("./post.route")

module.exports= (app)=>{
    app.use("/api/users",userRoutes)
    app.use("/api/posts",postRoutes)
}