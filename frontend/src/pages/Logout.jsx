import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuthContext } from '../context/AuthContext';

const Logout = () => {
    const [loading,setLoading]=useState(false)
  const {setAuthUser}=useAuthContext()
    const handleLogout = async()=>{
        setLoading(true)
        try {
            const res = await fetch("/api/users/logout",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                }
            })
            const data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }
            console.log("logout",data)
            toast.success("Logout Successfully")
            localStorage.removeItem("chat-user")
            setAuthUser("")
        } catch (error) {
            console.log("error in logout",error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
      <button onClick={handleLogout} className="m-1" >
      {loading?<span className="loading loading-spinner loading-sm"></span>: <RiLogoutBoxLine className="h-6 w-6" /> }
     
      </button>
    </div>
  )
}

export default Logout
