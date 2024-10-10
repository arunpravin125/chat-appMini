import {  createContext,useContext, useState } from "react"



export const AuthContext = createContext()

export const useAuthContext = ()=>{
    return useContext(AuthContext)
}



export const AuthContextProvider = ({children})=>{

    const [authUser,setAuthUser]=useState(JSON.parse(localStorage.getItem("chat-user"))|| null)
     const [selectedConversation,setSelectedConveration]=useState()
     const [messages,setMessages]=useState([])
    const [conversations,setConversations]=useState([])
    return (
    <AuthContext.Provider  value={{messages,setMessages,conversations,setConversations,authUser,setAuthUser,selectedConversation,setSelectedConveration}}>

        {children}
    </AuthContext.Provider>)
}