import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const Conversation = ({ conversation,isOnline,ownMessage }) => {
  // const [selectedConversation,setSelectedConveration]=useState("")
  const { selectedConversation, setSelectedConveration,authUser } = useAuthContext();
  console.log("selectedConversation", selectedConversation);

  return (
    <div
      onClick={() =>
        setSelectedConveration({
          conversationId: conversation._id,
          userId: conversation.participants[0]._id,
          username: conversation.participants[0].username,
          profilePic:conversation.participants[0].profilePic,
          mock: conversation.mock,
        })
      }
      className={`p-2  mt-2 w-full   cursor-pointer ${
        selectedConversation.userId == conversation.participants[0]._id
          ? "bg-slate-400"
          : ""
      } hover:bg-slate-400 rounded-lg `}
    >
     
      <div className="flex" >
      <div className={`avatar ${isOnline?"online":""}`}>
        <div className="w-10 rounded-full">
          <img src={conversation.participants[0].profilePic}/>
        
        </div>
       
      </div>
      <p className="ml-2 h-2">{conversation.participants[0].username}</p>
      </div>
      

      <div className="flex  ">
        <p> {ownMessage?"You":"from"}: </p>
        <p className="text-red-400 ml-1 w-40  ">
       {conversation.lastMessage.text.slice(0,17)}
        </p>
       
      </div>
      <p>{conversation.lastMessage.seen?"seen":""}</p>
    </div>
  );
};

export default Conversation;
