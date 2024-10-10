import React from 'react'


const MessageHeader = ({selectedConversation}) => {
  return (
    <div className="bg-orange-200 p-1 rounded-md">
   <p className="ml-2">To : {selectedConversation.username}</p>
    </div>
  )
}

export default MessageHeader
