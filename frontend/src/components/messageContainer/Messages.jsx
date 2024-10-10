import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { useAuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { useSocketContext } from '../../context/Socket'

const Messages = () => {
  const {selectedConversation,authUser,setConversations,conversations}=useAuthContext()
  const {messages,setMessages}=useAuthContext()
const [loading,setLoading]=useState(false)

const {socket}=useSocketContext()
const messageEndRef = useRef(null)
useEffect(()=>{

  socket?.on("newMessage",(message)=>{
    console.log("socketMessage",message)

    if(selectedConversation.conversationId == message.conversationId){
      setMessages((prev)=>[...prev,message])

    }
   
    setConversations((prevConversations)=>{
      const updatedConversation = prevConversations.map((conversation)=>{
        if(conversation._id == message.conversationId){
          return {
            ...conversation,lastMessage:{
              text:message.message,
              sender:message.sender
            }
          }

        }
        return conversation
      })
      return updatedConversation
    })
  })

  return ()=>socket.off("newMessage")
},[socket])

useEffect(()=>{
  const lastMessageFromOtherUser = messages.length && messages[messages.length-1].sender !== authUser._id
 
  if(lastMessageFromOtherUser){
    socket?.emit("marMessagesAsSeen",{
      conversationId:selectedConversation.conversationId,
      userId:selectedConversation.userId
    })
  }

  socket.on("messagesSeen",({conversationId})=>{

    console.log("messageSeen:",conversationId)
    if(selectedConversation.conversationId == conversationId){
      setMessages(prev=>{
        const updatedMessages = prev.map((messages)=>{
          if(!messages.seen){
            return {
              ...messages,seen:true
            }
          }
          return messages
        })
        return updatedMessages
      })
    }
  })


},[socket,authUser._id,messages,selectedConversation])

useEffect(()=>{

  messageEndRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])

  useEffect(()=>{
    
    const getMessages = async()=>{
      setLoading(true)
  
      try {
        if(selectedConversation.mock)return;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`)
        const data = await res.json()

        if(data.error){
          throw new Error(data.error)
        }
        console.log("messages",data)
        setMessages(data)
      } catch (error) {
        console.log("erorr in Messages",error)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
    if(selectedConversation?.userId)getMessages()

  },[selectedConversation?.userId])

  return (
    <div className="h-80 bg-yellow-200 p-1 overflow-auto">
      
      {messages.length<0?<h1 className="flex justify-center">No messages </h1>:""}
{loading?<div className="flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
     </div>:
     <>
     {messages.map((message)=>{
        return <div key={message._id} ref={messages.length -1 == messages.indexOf(message)? messageEndRef : null} >
          <Message  message={message} ownMessage={message.sender==authUser._id} />
        </div>
      })}
     </>}
      {/* {messages.map((message)=>{
        return <Message key={message._id} message={message} ownMessage={message.sender==authUser._id} />
      })}
      */}
    </div>
  )
}

export default Messages
