import React from 'react'

const Gender = ({gend,setGend,setInputs,inputs}) => {

   const handleGender = (value)=>{
    setGend(value)
    setInputs({...inputs,gender:value})
   }

  return (
    <div className=" flex">
      <input type="checkbox" className="ml-2   bg-slate-600" checked={gend=="male"}    onClick={()=>handleGender("male")} ></input>
      <p className="ml-1">Male</p>
      <input type="checkbox" className="ml-2 bg-slate-600"  checked={gend=="Female"}   onClick={()=>handleGender("Female")} ></input>
      <p className="ml-1">Female</p>
    </div>
  )
}

export default Gender
