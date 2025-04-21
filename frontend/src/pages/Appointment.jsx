import React, { useEffect, useState } from "react";
import { useContextData } from "../context/Context";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import moment from "moment";
import RelatedDoc from "../components/RelatedDoc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Appointment = () => {
  const api=import.meta.env.VITE_API_URI
  const navigate=useNavigate(null)
  const [doctor, setDoctor] = useState();
  const { doctors,user,getDoctors } = useContextData();
  const { docId } = useParams();
  const [appointmentDates, setAppointmentDates] = useState([]);
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotIndexTime,setSlotIndexTime]=useState('')

  

  const slotBookingFuntion = () => {
    const result = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(now);
      currentDate.setDate(currentDate.getDate() + i);

      let slots = [];

      for (let hour = 10; hour < 21; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeSlots = new Date(currentDate);
          timeSlots.setHours(hour, minute, 0, 0);

          if (i === 0 && timeSlots <= now) continue;
          const formatSlots = timeSlots.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          slots.push(formatSlots);
        }
      }
      result.push({ date: currentDate, slots });
    }
    setAppointmentDates(result);
  };


  useEffect(() => {
    setDoctor((prev) => doctors.find((each) => each._id === docId));
    slotBookingFuntion();
  }, [docId,doctors]);

  const confirmSlot=()=> {
    if(!user.name) {
      toast.warning('Login required to book slot')
      navigate('/login')
      scrollTo(0,0)
    }
    const slotDate=appointmentDates[slotIndex].date
    const slotTime=slotIndexTime
    axios.post(`${api}/appointment/add-appointment`,{docId,slotDate,slotTime},{withCredentials:true}).then(res=>{
      toast.success(res.data.msg)
      getDoctors()
      navigate('/my-appointments')
      scrollTo(0,0)
    }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
  }

  return (
    <div className="mx-4 md:mx-10">
      <div className="flex flex-col md:flex md:flex-row gap-4 items-start mt-4">
        {doctor?.name && (
          <>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="bg-primary rounded-lg md:w-[240px] w-full"
            />
            <div className="relative w-full">
              <div className="border-[1px] border-slate-500 rounded-lg px-4 py-6 relative top-[-80px]  bg-white md:relative md:top-0 mx-2 md:mx-0">
                <h1 className="flex items-center gap-2 font-medium text-2xl text-gray-900">
                  {doctor.name}
                  <img src={assets.verified_icon} width="18px" alt="verified" />
                </h1>
                <div className="flex gap-4 items-center">
                  <p className="text-lg text-gray-600 font-medium">
                    {doctor.degree} - {doctor.speciality}
                  </p>
                  <button className="border-[0.5px] border-blue-200 px-2 py-1 rounded-full text-sm text-gray-800">
                    {doctor.experience}
                  </button>
                </div>
                <div className="mt-2">
                  <p className="flex gap-2 font-medium">
                    About
                    <img src={assets.info_icon} alt="info-icon" width="12px" />
                  </p>
                  <p>{doctor.about}</p>
                </div>
                <p className="text-xl font-medium text-gray-600">
                  Appointment fee :{" "}
                  <span className="font-medium text-gray-950">
                    $ {doctor.fees}
                  </span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="md:ml-[260px] md:mt-2">
        <p className="text-lg text-gray-700 font-medium">Booking Slots</p>
        <div className="flex gap-5 overflow-x-scroll slotsContainer" >
        {appointmentDates.map((eachDate,index) => {
          return (
              <div key={index} className={`flex flex-col border-[1px] border-slate-500 rounded-full py-6 items-center w-[48px] cursor-pointer px-8 ${slotIndex===index?'bg-primary text-white':''}`} onClick={()=>setSlotIndex(index)}>
                <p className="font-medium">
                  {moment(eachDate.date).format("ddd")}
                </p>
                <p className="font-medium">
                  {moment(eachDate.date).format("DD")}
                </p>
              </div>
          );
        })}
        </div>


        <div className="flex gap-3 mt-3 overflow-x-scroll slotTimeContainer">
          {appointmentDates.length>0 && appointmentDates[slotIndex].slots.map((eachSlot,index)=>{

            const slotAvailable=doctor?.slotBookings.find(eachBooking=>new Date(eachBooking.date).getDate()===appointmentDates[slotIndex]?.date.getDate() && eachBooking?.time===eachSlot)
           
            return <p key={index} className={`px-6 py-2 border-[1px] border-blue-200 rounded-full text-sm text-gray-700 cursor-pointer ${slotIndexTime===eachSlot?'bg-primary text-white':''}`} onClick={()=>setSlotIndexTime(eachSlot)} hidden={slotAvailable?true:false}>{eachSlot.split(' ')}</p>
          })}
        </div>
        <button className="px-16 py-2 bg-primary rounded-full text-white mt-3 mb-4" onClick={confirmSlot}>Book Appointment</button>
      </div>

      {doctor && <RelatedDoc docId={doctor._id} speciality={doctor.speciality}/>}
    </div>
  );
};

export default Appointment;
