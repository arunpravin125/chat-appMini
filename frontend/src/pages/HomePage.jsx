import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import MessageContainer from '../components/messageContainer/MessageContainer'
import { useAuthContext } from '../context/AuthContext'


const HomePage = () => {
  const {authUser} = useAuthContext()

  return (
    <div className="h-[100%] justify-center  sm:flex flex-row md:flex ">
    <Sidebar/>
    <MessageContainer/>
    </div>
  )
}

export default HomePage
