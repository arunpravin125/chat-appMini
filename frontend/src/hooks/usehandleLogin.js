import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"


const usehandleLogin = () => {
 const [loading,setLoading]=useState(false)
 const {setAuthUser,authUser}=useAuthContext()

    const Login =async(userInputs)=>{
        setLoading(true)
        try {
            const res = await fetch("/api/users/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(userInputs)
            })
            const data = await res.json()
          
            if(data.error){
                throw new Error(data.error)
            }
            console.log("loginUser:",data)
            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
           
        } catch (error) {
            console.log("error in Login",error)
            toast.error(error.message)
            
        }finally{

            setLoading(false)
        }
    }
    return {loading,Login}
}

export default usehandleLogin
