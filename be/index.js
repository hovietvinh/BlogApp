const express = require("express")
const app = express()
const routes = require("./routes/index.route")
const cors = require("cors")
const env = require("dotenv")
const cookieParser = require("cookie-parser")
const config = require("./config/database")
env.config()

app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(express.json())

app.use(cookieParser())

config.connect();



routes(app);

app.listen(process.env.PORT,()=>{
    console.log("ok");
}) 