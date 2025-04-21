import React, { useState } from 'react';
import {useContextData} from '../context/Context'
import { assets } from '../assets/assets';
import moment from 'moment';
import axios from 'axios';
import {toast} from 'react-toastify'

const MyProfile = () => {
  const {user,setUser}=useContextData()
  const [isEdit,setIsEdit]=useState(false)
  const api=import.meta.env.VITE_API_URI
  const [image,setImage]=useState('')


  const userData={
      image:user?.image,
      name:user?.name,
      email:user?.email,
      phone:user?.phone,
      address:user?.address || "Not mentioned",
      gender:user?.gender ||"Not selected",
      dob:user?.dob
    }

  
  const [profile,setProfile]=useState(userData)


  const changeHandler=(e)=> {
    setProfile({...profile,[e.target.name]:e.target.value})
  }

  const saveChagedData=()=> {
    const formData=new FormData()
    formData.append('image',image)
    formData.append('name',profile.name)
    formData.append('email',profile.email)
    formData.append('phone',profile.phone)
    formData.append('address',profile.address)
    formData.append('gender',profile.gender)
    formData.append('dob',profile.dob)

    axios.put(`${api}/user/save-changes`,formData,{headers:{'Content-Type':'multipart/form-data'},withCredentials:true}).then(res=>{
      setUser(res.data.user)
      toast.success(res.data.msg)
      setIsEdit(false)
    }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
  }


  return (
    <div className='mx-4 md:mx-10 my-5'>
      {isEdit?<div className='flex gap-2 items-center'>
        <label htmlFor='image'>
        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="Upload area" width="100px" className='cursor-pointer'/>
        </label>
        <input type='file' id="image" hidden onChange={e=>setImage(e.target.files[0])}/>
        <p>Choose your favourite profile</p>
      </div>:<img src={userData.image} alt={userData.name} width="100px" className='rounded h-[90px] object-cover' />}
      <div> 
        {isEdit?
        <input type="text" name="name" value={profile.name} onChange={changeHandler} className='border border-blue-200 py-1 bg-gray-200 rounded px-1 mt-2 mb-2 w-64'/>
        :
        <p className='font-medium text-3xl mb-2 mt-2 text-slate-800'>{profile.name}</p>
        }
      </div>
      <hr/>
      <p className='text-sm underline text-slate-500 mt-4 mb-2'>CONTACT INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-2'>
        <p className='text-sm font-medium'>Email id:</p>
        <p className='text-blue-500 text-sm'>{profile?.email}</p>
        <p className='text-sm font-medium'>Phone:</p>
        {isEdit?
        <input type="text" name="phone" value={profile.phone} onChange={changeHandler} className='border border-blue-200 py-1 bg-gray-200 rounded px-1 w-36'/>
        :
        <p className='text-blue-500 text-sm'>{profile.phone}</p>
        }
        <p className='text-sm font-medium'>Address:</p>
        {isEdit?
        <textarea  cols="25" rows="4" name="address" value={profile.address} onChange={changeHandler} className='border border-blue-200 py-1 bg-gray-200 rounded px-1 sm:w-56 xm:w-48'/>
        :
        <p className='text-sm text-slate-600'>{profile.address}</p>
        }
      </div>
      <div className='mt-4 mb-4'>
      <h1 className='text-sm underline text-slate-500 mb-2'>BASIC INFORMATION</h1>
        <div className='grid grid-cols-[1fr_3fr] gap-2'>
          <p className='text-sm font-medium'>Gender:</p>
          {isEdit?
        <select name="gender" value={profile.gender} onChange={changeHandler} className='border border-blue-200 py-1 bg-gray-200 rounded px-1 w-48'>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        :
        <p className='text-sm text-slate-600'>{profile.gender}</p>
        }
        <p className='text-sm font-medium'>Bithday:</p>
        {isEdit?
        <input type="date" name="dob" onChange={changeHandler} className='border border-blue-200 py-1 bg-gray-200 rounded px-1 w-48'/>
        :
        <p className='text-sm text-slate-600'>{moment(profile.dob).format('DD-MM-YYYY')}</p>
        }
        </div>
      </div>
      {isEdit?<button className='border border-blue-400 px-6 py-1 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={saveChagedData}>Save Information</button>:<button className='border border-blue-400 px-6 py-1 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={()=>setIsEdit(true)}>Edit</button>}

    </div>
  )
}

export default MyProfile