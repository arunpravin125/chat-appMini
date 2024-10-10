
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

const useSearchUser = () => {
    const {selectedConversation,setSelectedConveration,authUser,conversations,setConversations}=useAuthContext()
  
    const [loading,setLoading]=useState(false)
  const search = async (user,setUser) => {
    setLoading(true)
    try {
      const res = await fetch("/api/users/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      });
      const searchedUser = await res.json();

      if (searchedUser.erorr) {
        throw new Error(searchedUser.error);
      }
      console.log("SearchedUser:", searchedUser);
      setUser("")
      if (searchedUser._id == authUser._id) {
        toast.error("You cannot message yourself");
      }

      if(conversations.find(conversation=>conversation.participants[0]._id == searchedUser._id)){

        setSelectedConveration({
            conversationId:conversations.find(conversation=>conversation.participants[0]._id == searchedUser._id)._id,
            userId:searchedUser._id,
            username:searchedUser.username

        })
        return
      }

      if(!searchedUser.error){
        const mockConversation = {
          mock:true,
          lastMessage:{
              text:"",
              sender:""
          },
          _id:Date.now(),
          participants:[
              {
                  _id:searchedUser._id,
                  username:searchedUser.username,
                  profilePic:searchedUser.profilePic
              }
          ]
       }
       setConversations((prev)=>[...prev,mockConversation])
      }

    
    
    } catch (error) {
      console.log("error in searchUser:", error);
      toast.error(error.message);
    }finally{
        setLoading(false)
    }
    
  }
  return {search,loading}
};

export default useSearchUser;
