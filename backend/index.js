import path from "path"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieparser  from "cookie-parser"
import { connectDB } from "./DB/database.js"
import { usersRouter } from "./routes/users.Routes.js"
import { messageRouter } from "./routes/message.Routes.js"
import {app,server} from "./socket/socket.js"




app.use(express.json())
app.use(cors())
app.use(cookieparser())
dotenv.config()

const usePort = process.env.PORT || 3501
const __dirname = path.resolve()
app.use("/api/users",usersRouter)
app.use("/api/messages",messageRouter)

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}






server.listen(usePort,()=>{
    connectDB()
    console.log(`Server started...${usePort}`)
})