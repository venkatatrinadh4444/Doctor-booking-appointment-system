import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const AppointmentBanner = () => {
  const navigate=useNavigate(null)
  return (
    <>
    <div className='bg-primary mx-4 md:mx-10 flex gap-4 justify-between rounded-lg items-center px-10 py-10 md:py-0'>
      <div>
      <h1 className='text-2xl md:text-4xl font-medium text-white' >Book Appointment</h1>
      <p className='text-2xl md:text-3xl font-medium text-white mt-2 mb-4'>With 100+ Trusted Doctors</p>
      <button onClick={()=>navigate('/login')}className='px-6 py-2 bg-white rounded-full text-gray-600 hover:scale-105 transtition-all duration-300'>Create Account</button>
      </div>
      <div className='hidden md:block'>
        <img src={assets.appointment_img} alt="appointment" width="300px" />
      </div>
    </div>
    </>
  )
}

export default AppointmentBanner