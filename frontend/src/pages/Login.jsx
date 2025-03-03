import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import usehandleLogin from '../hooks/usehandleLogin'
import toast from 'react-hot-toast'

const Login = () => {
    const [userInput,setUserInput]=useState({username:"",password:""})

    const {Login,loading}=usehandleLogin()
    const handleLogin=(e)=>{
        e.preventDefault()
        console.log(userInput)
        if(!userInput.username || !userInput.password){
            toast.error("please fill username && password")
        }
        Login(userInput)
    }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
           Username
          </label>
          <div className="mt-2">
            <input
              value={userInput.username}
              type="text"
              required
             onChange={(e)=>setUserInput({...userInput,username:e.target.value})}
              className="block w-full p-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              
            </div>
          </div>
          <div className="mt-2">
            <input
            value={userInput.password}
            onChange={(e)=>setUserInput({...userInput,password:e.target.value})}
              type="text"
              required
              
              className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button onClick={handleLogin}
            type="submit"
            className="flex  w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           {loading?<span className="loading loading-spinner loading-sm"></span>: "Login"}
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-xl text-gray-500">
        Don't have an Account?{' '}
        <Link to="/sign" className="underline text-xl hover:text-blue-500" >Signup</Link>
      </p>
    </div>
  </div>
  )
}

export default Login
