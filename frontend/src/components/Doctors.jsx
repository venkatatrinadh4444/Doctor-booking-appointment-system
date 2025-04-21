import React, { useEffect } from "react";
import { useContextData } from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Doctors = () => {
  const navigate=useNavigate(null)
  const {doctors}=useContextData()


  return (
    <div className="mx-4 md:mx-10 mt-4">
      <h1 className="text-center text-2xl font-medium">Top Doctors to Book</h1>
      <p className="text-center pb-4">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        {doctors.slice(0, 10).map((doctor, index) => {
          return (
            <div
              key={index}
              className="sm:w-[240px] border-2 border-blue-100 rounded-lg hover:translate-y-[-5px] transition-all duration-300 cursor-pointer" onClick={()=>navigate(`/appointment/${doctor._id}`)}>
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
      <div className="text-center mt-4 mb-4">
        <button className="bg-blue-200 px-8 py-2 rounded-full" onClick={()=>{navigate('/all-doctors');scrollTo(0,0)}}>More</button>
      </div>
    </div>
  );
};

export default Doctors;
