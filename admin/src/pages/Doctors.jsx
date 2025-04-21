import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Doctors = () => {
  const api=import.meta.env.VITE_API_URI
  const [doctors,setDoctors]=useState([])


  useEffect(()=> {
    axios.get(`${api}/doctors/all-doctors`).then(res=>setDoctors(res.data.doctors)).catch(err=>toast(err.response.data?.msg || "Something went wrong"))
  },[])

  const availabilityHandler=(id)=> {
    axios.put(`${api}/doctors/${id}/change-availability`).then(res=>{
      setDoctors(res.data.doctors)
      toast.success(res.data.msg)
    }).catch(err=>toast.error(err.response.data?.msg || "Something went wrong!"))
  }

  return (
    <>
    <div className='hidden sm:block w-[85%]'>
    <h1 className='text-2xl font-medium m-4 text-gray-900 ml-8'>All Doctors</h1>
    <div className='flex gap-2 flex-wrap justify-center ml-4'>
      {doctors.length>0 ? doctors.map(eachDoc=>{
        return <div key={eachDoc._id} className='w-[240px] rounded-xl border-[1.5px] border-blue-100 h-fit shadow group'>
          <img src={eachDoc.image} alt={eachDoc.name} width="100%" className='bg-indigo-50 group-hover:bg-primary transition-all duration-500 rounded-t-xl cursor-pointer'/>
          <div className='group-hover:white transition-all duration-500 cursor-pointer p-3'>
            <h1 className='text-lg font-medium text-gray-800 '>{eachDoc.name}</h1>
            <p className='text-slate-700 text-md'>{eachDoc.speciality}</p>
            <div className='flex items-center gap-1 mt-1'>
              <input type="checkbox" checked={eachDoc.availability} id={eachDoc._id} className='cursor-pointer' onChange={()=>availabilityHandler(eachDoc._id)}/>
              <label htmlFor={eachDoc._id} className='text-sm cursor-pointer'>Available</label>
            </div>
          </div>
        </div>
      }):<div>
        <h1>No Doctors Found!</h1>
        </div>}
    </div>
    </div>
    <div className="sm:hidden h-[80vh] flex items-center">
      <h1 className="text-2xl text-primary text-center mx-10">To access this page please use desktop mode</h1>
    </div>
    </>
  )
}

export default Doctors