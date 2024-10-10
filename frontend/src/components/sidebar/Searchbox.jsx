// import React, { useState } from 'react'
// import toast from 'react-hot-toast';
// import { FaSearch } from "react-icons/fa";
// import { useAuthContext } from '../../context/AuthContext';

// const Searchbox = () => {
//   const {selectedConversation,setSelectedConveration,authUser}=useAuthContext()
//   const [user,setUser]=useState("")
// const [loading,setLoading]=useState(false)

//   const searchUser =async()=>{

//     setLoading(true)
//     try {
//       const res = await fetch("/api/users/user",{
//         method:"POST",
//         headers:{
//           "Content-type":"application/json"
//         },
//         body:JSON.stringify({username:user})
//       })
//       const searchedUser = await res.json()

//       if(searchUser.erorr){
//         throw new Error(searchUser.error)
//       }
//       console.log("SearchedUser:",searchedUser)
//       if(searchUser._id == authUser._id ){
//         toast.error("You cannot message yourself")
//       }
//       setUser("")
//     } catch (error) {
//       console.log("error in searchUser",error)
//       toast.error(error.message)
//     }finally{
//     setLoading(false)
//   }
//   return (
//     <form className='flex '>
//      <input placeholder='Search..' value={user}  onChange={(e)=>setUser(e.target.value)}   className="w-36 p-1 mt-1 rounded-lg">

//      </input>
//      <div className="bg-slate-400 h-6 w-6 mt-3 ml-1 rounded-md">
//      <button onClick={searchUser} className="p-1  cursor-pointer ">
//      <FaSearch className="" />
//      </button>
//      </div>
//     </form>
//   )
// }
// }
// export default Searchbox
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useAuthContext } from '../../context/AuthContext';
import useSearchUser from '../../hooks/useSearchUser';
import toast from 'react-hot-toast';
// import toast from 'react-hot-toast';
const Searchbox = () => {
  const [user,setUser]=useState("")
  const {selectedConversation,setSelectedConveration,authUser}=useAuthContext()
 
  const {search,loading}=useSearchUser()

  const handleSeatch =()=>{
    if(!user){
      toast.error("Enter user name")
    }
    search(user,setUser)
  }
   
  return (
    <div className='flex '>
      <>
     <input placeholder='Search..' value={user}  onChange={(e)=>setUser(e.target.value)}   className="w-36 p-1 mt-1 rounded-lg">

     </input>
     <div className="bg-slate-400 h-6 w-6 mt-3 ml-1 rounded-md">
     <button onClick={handleSeatch} className="p-1  cursor-pointer ">
    {loading?   <span className="loading loading-spinner loading-xs"></span>:<FaSearch/>}
     </button>
     </div>
    </>
      
    </div>
  )
}

export default Searchbox
