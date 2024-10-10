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

app.use("/api/users",usersRouter)
app.use("/api/messages",messageRouter)

server.listen(usePort,()=>{
    connectDB()
    console.log(`Server started...${usePort}`)
})