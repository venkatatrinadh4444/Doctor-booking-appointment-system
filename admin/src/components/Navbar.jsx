import React from 'react';
import {assets} from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useContextData } from '../context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const api=import.meta.env.VITE_API_URI

  const {loggedUser,setLoggedUser}=useContextData()
  const navigate=useNavigate(null)

  const logoutFuntion=()=> {
    if(loggedUser.isAdmin) {
      axios.delete(`${api}/admin/admin-logout`,{withCredentials:true}).then(res=>{
        setLoggedUser({})
        toast.success(res.data.msg)
        navigate('/')
      }).catch(err=>toast.error(err.response.data?.msg || "Something went wrong"))
    }
    if(!loggedUser.isAdmin) {
      axios.delete(`${api}/doctors/doctor-logout`,{withCredentials:true}).then(res=>{
        setLoggedUser({})
        toast.success(res.data.msg)
        navigate('/')
      }).catch(err=>toast.error(err.response.data?.msg || "Something went wrong"))
    }
  }
  return (
    <>
    <div className='flex justify-between items-center md:mx-10 mx-4 py-2'>
        <div className='flex gap-1 items-center sm:flex sm:gap-3 sm:items-center'>
            <img src={assets.admin_logo} alt="logo" className='w-[140px] md:w-[180px]'/>
            <p className='border text-slate-500 text-xs font-medium border-slate-500 rounded-full px-3'>{loggedUser?.isAdmin?'Admin':'Doctor'}</p>
        </div>
        {loggedUser.email ? <button className='bg-primary px-6 py-1 rounded-full text-white' onClick={logoutFuntion}>Logout</button>:<button className='bg-primary px-6 py-1 rounded-full text-white' onClick={()=>navigate('/')}>Login</button>}
    </div>
    <hr/>
    </>
  )
}

export default Navbar