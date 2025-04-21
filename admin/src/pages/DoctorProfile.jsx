

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
    const api=import.meta.env.VITE_API_URI

    const [doctorData,setDoctorData]=useState({})
    const [isEdit,setIsEdit]=useState(false)

    const gettingDoctorProfile=()=> {
        axios.get(`${api}/doctors/doctor-details`,{withCredentials:true}).then(res=>{
            setDoctorData(res.data)
        }).catch(err=>toast.error(err.response.data?.msg))
    }

    useEffect(()=>{
        gettingDoctorProfile()
    },[])

    const checkBoxHandler=(e)=> {
        if(e.target.checked)
            setDoctorData({...doctorData,availability:true})
        else
            setDoctorData({...doctorData,availability:false})
    }

    const editDoctotData=()=> {
        axios.put(`${api}/doctors/update-doctor-details`,doctorData,{withCredentials:true}).then(res=>{
            toast.success(res.data.msg)
            setIsEdit(false)
        }).catch(err=>toast.error(err.response.data?.msg))
    }


  return (
    <>
    <div className='pl-4 py-4 bg-slate-100 w-[83%] hidden sm:block'>
        <img src={doctorData?.image} alt="" width="200px" className='bg-primary/80 rounded-md'/>
        <div className='bg-white shadow-md my-2 p-4 rounded-md w-[80%]'>
            <h1 className='text-2xl font-medium text-gray-900'>{doctorData?.name}</h1>
            <div className='flex gap-2 text-sm text-gray-800'>
            <p>{doctorData?.degree} - {doctorData?.speciality}</p>
            <p className='border border-gray-400 rounded-full px-2 text-sm'>{doctorData?.experience}</p>
            </div>
            <h1 className='text-lg font-medium text-gray-800 mt-3'>About:</h1>
            <p className='text-sm text-gray-800 pr-4 pb-3'>{doctorData?.about}</p>
            <div className='flex gap-2 items-center'>
                <p className='text-lg text-gray-900'> Appointment fee:</p>
               {!isEdit &&  <p className='text-lg font-medium'>$ {doctorData.fees}</p>}
               {isEdit && <input type='number' placeholder='Enter your fees' className='bg-gray-200 rounded-md px-1 py-1' value={doctorData.fees} onChange={e=>setDoctorData({...doctorData,fees:e.target.value})}/>}
            </div>
            <div className='flex gap-2 items-center mt-2'>
                <p className='text-lg text-gray-900'>Address:</p>
                {!isEdit && <p className='text-sm font-medium'>{doctorData?.address}</p>}
                {isEdit && <textarea rows="2" placeholder='Enter your address' className='bg-gray-200 rounded-md px-1 py-1' value={doctorData.address} onChange={e=>setDoctorData({...doctorData,address:e.target.value})}/>}
            </div>
            <div className='flex gap-2 items-center my-2'>
                <input type='checkbox' checked={doctorData?.availability || false} value={doctorData?.availability} onChange={checkBoxHandler}/>
                <p className='text-sm font-medium'>Available</p>
            </div>

        {!isEdit && <button className='border border-slate-500 px-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={()=>setIsEdit(true)}>Edit</button>}
        {isEdit && <button className='border border-slate-500 px-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={editDoctotData}>Save</button>}
        </div>
    </div>

    <div className="sm:hidden h-[80vh] flex items-center">
      <h1 className="text-2xl text-primary text-center mx-10">To access this page please use desktop mode</h1>
    </div>
    </>
  )
}

export default DoctorProfile