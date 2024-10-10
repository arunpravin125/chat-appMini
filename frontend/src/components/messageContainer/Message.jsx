import React from 'react'
import { useAuthContext } from '../../context/AuthContext'


const Message = ({message,ownMessage}) => {
  const {authUser,selectedConversation}=useAuthContext()
  return (
    <>
   <div className={`chat ${ownMessage?"chat-end":"chat-start"} `}>
   <div className="chat-image avatar">
   <div className="w-10 rounded-full">
                <img
                alt='Tailwind CSS chat bubble componenet'
                src={ownMessage?authUser.profilePic:selectedConversation.profilePic}
                >
                </img>

            </div>
   </div>
  <div className="chat-header">
 
   {/* <time className="text-xs opacity-50">12:45</time> */}
  </div>
 <div className="chat-bubble overflow-x-clip ">{message.message}</div>
 {ownMessage?<div className={`chat-footer opacity-50 `}>{message.seen?"seen":""}</div>:""}
</div>
    </>
  )
}

export default Message



// const Message = ({message,ownMessage}) => {
//   return (
//     <>
//     <div className={`chat ${ownMessage?"chat-end":"chat-start"}`}>
//   <div className="chat-image avatar">
   
//   </div>
//   <div className="chat-header">
 
//     <time className="text-xs opacity-50">12:45</time>
//   </div>
//   <div className="chat-bubble">{message.message}</div>
 
// </div>

//     </>
//   )
// }