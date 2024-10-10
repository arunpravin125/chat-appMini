import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Gender from './Gender'
import toast from 'react-hot-toast'
import usehandleSignup from '../hooks/usehandleSignup'

const Signup = () => {
    const [gend,setGend]=useState("")
    const {loading,Signup}=usehandleSignup()

    const [inputs,setInputs]=useState({name:"",username:"",password:"",confirmPassword:"",gender:""})
   
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!inputs.name || !inputs.username ||!inputs.password ||  !inputs.confirmPassword || !inputs.gender){
            toast.error("Please fill all the fields")
        }
        if(inputs.password !==inputs.confirmPassword){
            toast.error("Password and confirmPassword Must be same")
        }
     Signup(inputs,setInputs)
    

    }
    return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     
      <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Signup
      </h2>
    </div>

    <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-6">
      <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
           FullName
          </label>
          <div className="mt-2">
            <input
              
              type="text"
              required
              value={inputs.name}
              onChange={(e)=>setInputs({...inputs,name:e.target.value})}
              className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
           Username
          </label>
          <div className="mt-2">
            <input
              
              type="text"
              required
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs,username:e.target.value})}
              className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
           Password
          </label>
          <div className="mt-2">
            <input
              
              type="text"
              required
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs,password:e.target.value})}
              className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
             confirmPassword
            </label>
            <div className="text-sm">
              
            </div>
          </div>
          <div className="mt-1">
            <input
            
              type="text"
              required
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
              className="block p-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

            <Gender gend={gend} setGend={setGend} inputs={inputs} setInputs={setInputs}  />
        <div>
          <button
          onClick={handleSubmit}
            type="submit"
            className="flex w-full text-base justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
           {loading?<span className="loading loading-spinner loading-sm"></span>: "Signup"}
          </button>
        </div>
      </form>

      <p className="mt-1 text-center text-xl text-gray-500">
        Already have an Account?{' '}
        <Link to="/login" className="underline text-xl hover:text-blue-500" >Login</Link>
      </p>
    </div>
  </div>
  )
}

export default Signup
