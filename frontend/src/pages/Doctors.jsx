import React, { useEffect, useState } from 'react';
import {useContextData} from '../context/Context';
import { useNavigate, useParams } from 'react-router-dom';


const Doctors = () => {
  const navigate=useNavigate(null)
  const {doctors}=useContextData()
  const specialityList=['General physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist']
  const [data,setData]=useState(doctors)
  const {speciality}=useParams()

  const doctorFiltering=()=>{
    if(speciality) {
      setData(prev=>doctors.filter(each=>each.speciality===speciality))
    }
    else {
      setData(doctors)
    }
  }

  useEffect(()=> {
      doctorFiltering()
  },[speciality,doctors])

  return (
    <div className='mx-4 md:mx-10'>
      <p className='mt-3 text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col md:flex md:flex-row mt-3 md:gap-4'>
        <div className='md:block hidden'>
        {specialityList.map(each=>{
            return <p key={each} onClick={()=>navigate(`/doctors/${each}`)} className={`border-[1.5px] border-gray-300 rounded-md px-5 py-1 mb-2 text-md text-gray-600 cursor-pointer ${speciality===each?'bg-blue-200 text-black':''}`}>{each}</p>
          })}
        </div>
        <div className='block md:hidden text-center mb-3'>
          <select onChange={(e)=>navigate(`/doctors/${e.target.value}`)} className='w-2/3 py-2 px-1 border-slate-300 border rounded-md shadow-lg text-md text-slate-900 outline-none'>
            <option value="" selected disabled>Filter by speciality</option>
          {specialityList.map(each=>{
            return <option value={each} key={each}>
              {each}
            </option>
          })}
          </select>
        </div>

        <div className='flex flex-wrap gap-4 justify-center'>
          {data?.map(doctor=>{
            return (
              <div
                key={doctor._id}
                className="sm:w-[230px] md:w-[240px] lg:w-[280px] border-2 border-blue-100 rounded-lg hover:translate-y-[-5px] transition-all duration-300 cursor-pointer" onClick={()=>navigate(`/appointment/${doctor._id}`)}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  width="100%"
                  className=" bg-blue-100 rounded-t-lg"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <p className={`w-2 h-2 ${doctor.availability?'bg-green-500 ':'bg-gray-500'} rounded-full`}></p>
                    <p className='text-sm text-gray-900'>{doctor.availability?'Available':'Unavailable'}</p>
                  </div>
                  <h1 className="font-medium">{doctor.name}</h1>
                  <p className="text-gray-600">{doctor.speciality}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Doctors