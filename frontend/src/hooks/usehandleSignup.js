import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"


const usehandleSignup = () => {
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()

    const Signup =async(inputs)=>{
        setLoading(true)
        try {
            const res = await fetch("/api/users/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(inputs)
            })
            const data = await res.json()
          
            if(data.error){
                throw new Error(data.error)
            }
            console.log("SignupUser:",data)
         localStorage.setItem("chat-user",JSON.stringify(data))
         setAuthUser(data)
           
        } catch (error) {
            console.log("error in Signup",error)
            toast.error(error.message)
            
        }finally{

            setLoading(false)
        }
    }
    return {loading,Signup}
}

export default usehandleSignup
