import React from 'react'
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import {useContextData} from '../context/Context'

const Sidebar = () => {
    const {loggedUser}=useContextData()

  return (
    <div className='flex flex-col gap-1 border-r border-slate-400 min-h-[90vh]'>
        <NavLink to='/dashboard' className={({isActive})=>`flex gap-3 py-3 px-8  mt-6 ${isActive?'bg-indigo-100 border-r-4 border-primary':''}`}>
            <img src={assets.home_icon} alt="home" width="26px"/>
            <p className='text-md text-gray-700 hidden lg:block'>Dashboard</p>
        </NavLink>
        <NavLink to='/appointments' className={({isActive})=>`flex gap-3 py-3 px-8 ${isActive?'bg-indigo-100 border-r-4 border-primary':''}`}>
            <img src={assets.appointment_icon} alt="home" width="26px"/>
            <p className='text-md text-gray-700 hidden lg:block'>Appointments</p>
        </NavLink>
        {loggedUser?.isAdmin && <NavLink to='/add-doctor' className={({isActive})=>`flex gap-3 py-3 px-8 ${isActive?'bg-indigo-100 border-r-4 border-primary':''}`}>
            <img src={assets.add_icon} alt="home" width="26px"/>
            <p className='text-md text-gray-700 hidden lg:block'>Add Doctor</p>
        </NavLink>}
        <NavLink to='/doctors' className={({isActive})=>`flex gap-3 py-3 px-8 ${isActive?'bg-indigo-100 border-r-4 border-primary':''}`}>
            <img src={assets.people_icon} alt="home" width="26px"/>
            <p className='text-md text-gray-700 hidden lg:block'>Doctors List</p>
        </NavLink>
    </div>
  )
}

export default Sidebar