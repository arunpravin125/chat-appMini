import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { useSocketContext } from '../../context/Socket'

const Conversations = () => {

const [loading,setLoading]=useState(false)
const {conversations,setConversations,authUser,}=useAuthContext()
const {socket,onlineUsers}=useSocketContext()

useEffect(()=>{

  socket?.on("messagesSeen",({conversationId})=>{
    setConversations(prev=>{
      const updateConversation = prev.map((conversation)=>{
        if(conversation._id == conversationId){
          return{
            ...conversation,lastMessage:{
              ...conversation.lastMessage,seen:true
            }
          }
        }
        return conversation
      })
      return updateConversation
    })
  })
},[socket,setConversations])

  useEffect(()=>{
    const getConversation = async()=>{
      setLoading(true)
      try {
        const res = await fetch("/api/messages/",{
          method:"POST",
          headers:{
            "Content-Type":"appliaction/json"
          }
        })

        const data = await res.json()

        if(data.error){
          throw new Error(data.error)
        }
        console.log("getConversation:",data)
        setConversations(data)
      } catch (error) {
        console.log("error in getConversation:",error)
        toast.error(error.message)
        
      }finally{
        setLoading(false)

      }
    }
    getConversation()

  },[authUser?._id])
  return (
    <div className="h-96 w-44 overflow-auto ">
     
     {loading?
     <div className="flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
     </div>
    :
     <>
     {
       conversations.map((conversation)=>{
        return <Conversation key={conversation._id} ownMessage={authUser._id==conversation.lastMessage.sender} isOnline={onlineUsers.includes(conversation.participants[0]._id)} conversation={conversation} />
      })
     }
     </>
     }

      {/* {
        conversations.map((conversation)=>{
          return <Conversation key={conversation._id} conversation={conversation} />
        })
      } */}
      
      
     
    </div>
  )
}

export default Conversations
