import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContextData } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const api=import.meta.env.VITE_API_URI
  const {loggedUser,setLoggedUser}=useContextData()
  const [isAdmin,setIsAdmin]=useState(false)
  const [data,setData]=useState({
    email:'',
    password:''
  })
  const navigate=useNavigate()

  const adminLoginFuntion=()=> {
    axios.post(`${api}/admin/admin-login`,data,{withCredentials:true}).then(res=>{
      setLoggedUser(res.data.user)
      toast.success(res.data.msg)
      navigate('/dashboard')
    }).catch(err=>toast.error(err.response.data.msg))
  }

  const doctorLoginFunction=()=> {
    const {email,password}=data
    axios.post(`${api}/doctors/doctor-login`,{email,password},{withCredentials:true}).then(res=>{
      toast.success(res.data.msg)
      setLoggedUser(res.data.user)
      navigate('/dashboard')
    }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
  }

  return (
    <div className='min-h-[75vh] flex justify-center items-center my-6 m-auto'>
      <form className='border border-slate-300 rounded-lg shadow-lg p-8 flex flex-col gap-3 md:w-96 sm:w-96' onSubmit={(e)=>e.preventDefault()}>
        <h1 className='text-2xl font-medium text-center text-gray-700'><span className='text-primary'>{isAdmin?'Admin':'Doctor'}</span> Login</h1>
    
          <div className='flex flex-col'>
          <label htmlFor='email' className='text-sm text-gray-700'>Email</label>
          <input type='email' required id='email' className='border-b border-b-slate-500 outline-none py-1' placeholder='Enter email' value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
          </div>

          <div className='flex flex-col'>
          <label htmlFor='password' className='text-sm text-gray-700'>Password</label>
          <input type='password' id='password' className='border-b border-b-slate-500 outline-none py-1' placeholder='Enter password' value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}/>
          </div>
          {isAdmin?<button className='bg-primary py-2 rounded text-white' onClick={adminLoginFuntion}>Login</button>:<button className='bg-primary py-2 rounded text-white' onClick={doctorLoginFunction}>Login</button>}
         
          {isAdmin?<p className='text-sm text-slate-600'>Doctor Login ? <span className='text-blue-500 underline cursor-pointer' onClick={()=>setIsAdmin(false)}>Click here</span></p>:<p className='text-sm text-slate-600'>Admin Login ? <span className='text-blue-500 underline cursor-pointer' onClick={()=>setIsAdmin(true)}>Click here</span></p>}
      </form>
    </div>
  )
}

export default Login