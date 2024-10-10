import {Server} from "socket.io"
import http from "http";
import express from "express"
import Message from "../model/message.Model.js";
import Conversation from "../model/Conversation.model.js";

const app = express();
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})


var socketMap = {} // userId=socket.id

export const getReceiverSocketId = (receiverId)=>{
    console.log("getReceiverId",receiverId)
   return socketMap[receiverId]
}

io.on("connection",(socket)=>{
console.log("User connected",socket.id)
const userId =socket.handshake.query.userId

if(userId !== "undefined"){
    socketMap[userId] = socket.id
}

io.emit("getOnlineUser",Object.keys(socketMap)) // output is _id:734653728283728

socket.on("marMessagesAsSeen",async({conversationId,userId})=>{
    console.log("markMessagesasSeen",conversationId,"userId",userId)
    try {
        await Message.updateMany({conversationId:conversationId,seen:false},{$set:{seen:true}})
        await Conversation.updateOne({_id:conversationId},{$set:{"lastMessage.seen":true}})
        io.to(socketMap[userId]).emit("messagesSeen",{conversationId})
    } catch (error) {
        console.log("error in messagesAsSeen",error)
    }
})

socket.on("disconnect",()=>{
    console.log("User disconnect")
    delete socketMap[userId]
    io.emit("getOnlineUser",Object.keys(socketMap))
})
})


export {io,server,app}