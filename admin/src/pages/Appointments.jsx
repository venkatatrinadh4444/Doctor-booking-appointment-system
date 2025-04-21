import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContextData } from '../context/Context';
import { toast } from 'react-toastify';
import moment from 'moment';
import { assets } from '../assets/assets';


const Appointments = () => {
  const {loggedUser}=useContextData()
  const api=import.meta.env.VITE_API_URI
  const [allAppointments,setAllAppointments]=useState([])

  const getAllAppointments=()=> {
    axios.get(`${api}/admin/all-appointments`,{withCredentials:true}).then(res=>{
/*       toast.success(res.data.msg) */
      setAllAppointments(res.data.allAppointments)
    }).catch(err=>toast.error(err.response.data?.msg || "Something went wrong"))
  }

  const getDoctorAppointments=()=> {
    axios.get(`${api}/doctors/doctor-appointments`,{withCredentials:true}).then(res=>{
      setAllAppointments(res.data)
    }).catch(err=>toast.error(err.response.data?.mgs || "Something went wrong"))
  }

  useEffect(()=>{
    if(loggedUser.isAdmin)
      getAllAppointments()
    if(!loggedUser.isAdmin)
      getDoctorAppointments()
  },[])

  const cancelAppointment=(id)=> {
    axios.post(`${api}/admin/cancel-appointment`,{appointmentId:id},{withCredentials:true}).then(res=>{
      toast.success(res.data.msg)
      getAllAppointments()
    }).catch(err=>toast.error(err.response.data.msg||"Something went wrong"))
  }

  const doctorCancelAppointment=(id)=> {
    axios.post(`${api}/doctors/cancel-appointment`,{appointmentId:id},{withCredentials:true}).then(res=>{
      toast.success(res.data.msg)
      getDoctorAppointments()
    }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
  }

  const doctorCompleteAppointment=(id)=> {
    axios.post(`${api}/doctors/complete-appointment`,{appointmentId:id},{withCredentials:true}).then(res=>{
      toast.success(res.data.msg)
      getDoctorAppointments()
    }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
  }


  return (
    <>
    <div className='hidden sm:block w-[90%]'>
      <h1 className='text-xl font-medium text-gray-900 mx-4 my-4'>All Appointments</h1>

      <div className='border border-slate-300 rounded-md mx-4 shadow-lg h-[75vh] overflow-y-scroll'>
        <div className='flex justify-between gap-2 pr-4 md:grid md:grid-cols-[0.5fr_3fr_2fr_3fr_3fr_1fr_1fr] items-center py-2'>
            <p className='text-sm font-medium'>#</p>
            <p className='text-sm font-medium'>Patient</p>
            {!loggedUser.isAdmin && <p className='text-sm font-medium'>Payment</p>}
            <p className='text-sm font-medium'>Age</p>
            <p className='text-sm font-medium'>Date & Time</p>
            {loggedUser?.isAdmin && <p className='text-sm font-medium'>Doctor</p>}
            <p className='text-sm font-medium'>Fees</p>
            <p className='text-sm font-medium'>Actions</p>
        </div>
        <div>
          {allAppointments.length>0 && allAppointments.map((eachAppointment,index)=>{
            return (
              <div key={index} className='flex justify-between gap-2 pr-4 md:grid  md:grid-cols-[0.5fr_3fr_2fr_3fr_3fr_1fr_1fr] items-center py-2 mb-2 shadow-sm hover:bg-slate-200 transition-all duration-500 text-sm text-gray-800'>
                <p>{index+1}</p>

                <div className='flex gap-1 items-center'>
                  <img src={eachAppointment.userId?.image} alt={eachAppointment.userId?.name} className='rounded-full w-8 h-8 object-cover'/>
                  <p>{eachAppointment.userId?.name}</p>
                </div>

                {!loggedUser.isAdmin &&
                <p className='border border-gray-600 text-sm rounded-full text-gray-800 font-medium w-14 px-2 text-center'>{eachAppointment?.payment?"online":"cash"}</p>
                }  

                <p>{new Date().getFullYear()-new Date(eachAppointment.userId?.dob?.split('T')[0]).getFullYear()}</p>

                <div className='md:flex items-center'>
                <p className='text-xs'>{moment(eachAppointment.slotDate).format('DD MMM YYYY')},</p>
                <p className='text-xs'>{eachAppointment.slotTime}</p>
                </div>

                {loggedUser?.isAdmin && <div className='flex gap-1 items-center'>
                  <img src={eachAppointment.docId.image} alt={eachAppointment.docId.name} className='rounded-full w-9 h-9 object-cover bg-gray-300'/>
                  <p>{eachAppointment.docId.name}</p>
                </div>}

                <p>{eachAppointment.amount}</p>

               {/*  Admin actions */}
                {loggedUser?.isAdmin &&!eachAppointment.cancelled && !eachAppointment.isCompleted &&
                <img src={assets.cancel_icon} alt="cancel" width="28px" className="cursor-pointer" onClick={()=>cancelAppointment(eachAppointment._id)}/>}

                {loggedUser?.isAdmin && eachAppointment.cancelled && <p className='text-sm text-red-500 font-medium'>Cancelled</p>}

                {loggedUser.isAdmin && !eachAppointment.cancelled && eachAppointment.isCompleted && 
                <p className='text-sm text-green-500 font-medium'>Completed</p>
                }



               {/*  Doctor actions */}
                {!loggedUser.isAdmin && 
                !eachAppointment.cancelled &&
                !eachAppointment.isCompleted &&
                <div className='flex gap-2'>
                  <img src={assets.cancel_icon} alt="" width="28px" className='cursor-pointer' onClick={()=>doctorCancelAppointment(eachAppointment._id)}/>
                  <img src={assets.tick_icon} alt=""
                  width="28px" className='cursor-pointer' onClick={()=>doctorCompleteAppointment(eachAppointment._id)}/>
                  </div>}

                  {!loggedUser.isAdmin && 
                  eachAppointment.cancelled &&
                  <p className='text-sm font-medium text-red-500'>Cancelled</p>}

                  {!loggedUser.isAdmin && 
                  !eachAppointment.cancelled &&
                  eachAppointment.isCompleted &&  <p className='text-sm font-medium text-green-500'>Completed</p>}
              </div>
            )
          })}
        </div>
      </div>
      
    </div>

    <div className="sm:hidden h-[80vh] flex items-center">
      <h1 className="text-2xl text-primary text-center mx-10">To access this page please use desktop mode</h1>
    </div>
    </>
  )
}

export default Appointments