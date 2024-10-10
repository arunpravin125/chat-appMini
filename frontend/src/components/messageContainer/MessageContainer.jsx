import React, { useEffect, useState } from 'react'
import MessageHeader from './MessageHeader'
import Messages from './Messages'
import { IoSend } from "react-icons/io5";
import { useAuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const MessageContainer = () => {
  const {selectedConversation,setSelectedConversation,conversations,setConversations}=useAuthContext()
  const [loading,setLoading]=useState(false)
  const {messages,setMessages}=useAuthContext()
  const [input,setInput]=useState()

  const sendMessage = async()=>{
    setLoading(true)
    try {
      const res = await fetch(`/api/messages/${selectedConversation.userId}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({message:input})
      })

      const data = await res.json()

      if(data.error){
        throw new Error(data.error)
      }
      console.log("message:",data)

      setMessages((messages)=>[...messages,data])

      setConversations(prev =>{
        const updatedConversation =prev.map(conversations =>{
          if(conversations._id == selectedConversation.conversationId){
            return{
              ...conversations,lastMessage:{
                text:input,
                sender:data.sender
              }
            }
           
          }
          return conversations
        })
        return updatedConversation

      })
      setInput('')
    } catch (error) {
      console.log("error in sendMessage:",error)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="w-1/3 flex flex-col justify-center mt-2 ">
   
      {selectedConversation?
      <>
      <MessageHeader  selectedConversation={selectedConversation} />
      <Messages  />
      <div  className="w-[100%] p-1 rounded-md bg-yellow-300">
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} className="w-[90%] p-1 bg-red-100 rounded-md" ></input>
        <button onClick={sendMessage} className="ml-2">
        {loading?<span className="loading loading-spinner loading-xs"></span>:<IoSend />}
        </button>
      </div>
      </>:
      <>
      <NoConversationSelected/>
      </>}
    </div>
  )
}

export default MessageContainer

const NoConversationSelected = ()=>{
  const {authUser}=useAuthContext()
  return (
    <div className="w-1/3  mt-1 w-72 rounded-md">
   
   
    <div className="h-96 flex justify-center items-center bg-yellow-200 p-1">
      <h1 className="">Hi,{authUser.name}</h1>
    </div>
    
  </div>
  )
}


// conversationId
// : 
// "6704e108a615f19384e2a81f"
// createdAt
// : 
// "2024-10-08T19:31:23.969Z"
// message
// : 
// "hii"
// sender
// : 
// "67041f53dda8fb576a9ad2f6"
// updatedAt
// : 
// "2024-10-08T19:31:23.969Z"