import Conversation from "../model/Conversation.model.js"
import Message from "../model/message.Model.js"
import { getReceiverSocketId, io} from "../socket/socket.js"

export const getMessage = async(req,res)=>{
    try {
        const {id:receiverId} = req.params
   
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })
    if(!conversation){
        res.status(200).json([])
    }

    const messages = await Message.find({
        conversationId:conversation._id
    }).sort({createdAt:1})

    if(!messages){
        res.status(200).json()
    }
    res.status(200).json(messages)
        
    } catch (error) {
        console.log("error in sendMessge:",error)
        res.status(400).json({error:error.message})
    }
}
export const sendMessage = async(req,res)=>{
    try {
        const {id:receiverId} = req.params
    const {message}=req.body
    const senderId = req.user._id

    if(!message){
        res.status(400).json({error:"Please enter a text to send"})
    }
    let conversation = await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })

    if(!conversation){
        conversation = new Conversation({
            participants:[senderId,receiverId],
            lastMessage:{
                text:message,
                sender:senderId
            }
        })
        await conversation.save()
    }
    

    const newMessage = new Message({
        sender:senderId,
        conversationId:conversation._id,
        message
    })

    await Promise.all([newMessage.save(),conversation.updateOne({
        lastMessage:{
            text:message,
            sender:senderId
        }
    })])

const recipiantsId = getReceiverSocketId(receiverId);
console.log("recipinats",recipiantsId)
if(recipiantsId){
    
io.to(recipiantsId).emit("newMessage",newMessage)
}

res.status(200).json(newMessage)
    } catch (error) {
        console.log("error in sendMessge:",error)
        res.status(400).json({error:error.message})
    }
}

export const getConversation= async(req,res)=>{
    try {
        const userId = req.user._id

        const conversation =await Conversation.find({
            participants:userId
      
     } ).populate({path:"participants",select:"username profilePic"})
   
     conversation.forEach((conversatio)=>{
        conversatio.participants = conversatio.participants.filter((participants)=>{
            return participants._id.toString() !== userId.toString()
        })
     })


     res.status(200).json(conversation)
        
    } catch (error) {
        console.log("error in getConversation:",error)
        res.status(400).json({error:error.message})
    }
}
