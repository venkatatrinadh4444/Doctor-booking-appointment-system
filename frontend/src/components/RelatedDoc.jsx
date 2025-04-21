import React, { useEffect, useState } from 'react';
import { useContextData } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const RelatedDoc = ({speciality,docId}) => {
    const {doctors}=useContextData()
    const [relatedDoc,setRelatedDoc]=useState([])
    const navigate=useNavigate(null)

    useEffect(()=>{
        setRelatedDoc(prev=>doctors.filter(eachDoc=>eachDoc.speciality===speciality && eachDoc._id!==docId))
    },[docId,speciality])

  return (
    <>
    <h1 className='text-center mt-4 text-3xl font-medium text-gray-800'>Related Doctors</h1>
    <p className='text-center text-sm text-slate-900 mt-3'>Simply browse through our extensive list of trusted doctors.</p>
    <div className='sm:flex gap-4 mb-4 mt-4'>
        {relatedDoc.length>0 && relatedDoc.slice(0, 5).map((doctor, index) => {
          return (
            <div
              key={index}
              className="md:w-[240px] border-2 border-blue-100 rounded-lg hover:translate-y-[-5px] transition-all duration-300 cursor-pointer" onClick={()=>{navigate(`/appointment/${doctor._id}`);scrollTo(0,0)}}>
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
    </>
  )
}

export default RelatedDoc