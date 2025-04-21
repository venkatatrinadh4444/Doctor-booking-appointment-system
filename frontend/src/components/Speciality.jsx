import React from 'react';
import { specialityData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Speciality = () => {
  const navigate=useNavigate(null)
  return (
    <div className='mx-6 md:mx-10 flex flex-col items-center' id='speciality'>
        <h1 className='text-3xl font-medium md:text-4xl mt-6'>Find by Speciality</h1>
        <p className='pt-2 text-center'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex gap-4 py-4 scrollContainer overflow-x-scroll w-full md:justify-center'>
        {
            specialityData.map((item,index)=>{
                return <div className='flex flex-col items-center cursor-pointer hover:translate-y-[-5px] transition-all duration-300'key={index}  onClick={()=>{navigate(`/doctors/${item.speciality}`);scrollTo(0,0)}}>
                    <img src={item.image} alt={item.speciality} width="60px"/>
                    <p className='text-[12px]'>{item.speciality}</p>
                </div>
            })
        }
        </div>
    </div>
  )
}

export default Speciality