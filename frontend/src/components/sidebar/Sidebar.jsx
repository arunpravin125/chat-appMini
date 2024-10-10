import React, { useEffect } from 'react'
import Searchbox from './Searchbox'
import Conversations from './Conversations'
import Logout from '../../pages/Logout'
import { useAuthContext } from '../../context/AuthContext'

const Sidebar = () => {
  const {selectedConversation,setSelectedConveration,authUser,conversations,setConversations}=useAuthContext()
 
  useEffect(()=>{

    return ()=>setSelectedConveration("")
  },[])
  return (
    <div className="flex flex-col p-1 ml-1 h-96 w-48 bg-amber-200  m-4 rounded-lg sm:">
     <Searchbox/>
      <div className="divider mt-1 mb-1" ></div>
      <Conversations/>
      <div className="divider mt-1 mb-1" ></div>
      <Logout/>
    </div>
  )
}

export default Sidebar
