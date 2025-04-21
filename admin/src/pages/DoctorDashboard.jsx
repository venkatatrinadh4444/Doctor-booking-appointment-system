import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import moment from "moment";

const DoctorDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const api = import.meta.env.VITE_API_URI;

  const gettingDoctorDashboard=()=> {
    axios
      .get(`${api}/doctors/doctor-dashboard`, { withCredentials: true })
      .then((res) => {
        setDashboardData(res.data)
        console.log(res)
      })
      .catch((err) => toast.error(err.response.data?.msg));
  }

  useEffect(() => {
    gettingDoctorDashboard()
  }, []);

   const doctorCancelAppointment=(id)=> {
      axios.post(`${api}/doctors/cancel-appointment`,{appointmentId:id},{withCredentials:true}).then(res=>{
        toast.success(res.data.msg)
        gettingDoctorDashboard()
      }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
    }



  return (
    <>
    <div className="pl-4 bg-slate-100 hidden sm:block">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2 items-center bg-white shadow-sm rounded-md px-6 py-3 my-4 hover:scale-105 transition-all duration-300">
          <img src={assets.earning_icon} alt="doctor" width="42px" />
          <div>
            <p className="font-medium text-xl">
             $ {dashboardData?.currency}</p>
            <p className="text-sm text-gray-900">Currency</p>
          </div>
        </div>

        <div className="flex gap-2 items-center bg-white shadow-sm rounded-md px-6 py-3 my-4 mx-4 hover:scale-105 transition-all duration-300">
          <img src={assets.appointment_icon} alt="doctor" width="42px" />
          <div>
            <p className="font-medium text-xl">
              {dashboardData?.totalAppointements}
            </p>
            <p className="text-sm text-gray-900">Appointments</p>
          </div>
        </div>

        <div className="flex gap-2 items-center bg-white shadow-sm rounded-md px-6 py-3 my-4 mx-4 hover:scale-105 transition-all duration-300">
          <img src={assets.patients_icon} alt="doctor" width="42px" />
          <div>
            <p className="font-medium text-xl">{dashboardData?.totalPatients}</p>
            <p className="text-sm text-gray-900">Patients</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 items-center mt-4 bg-white py-4 px-3 rounded-t-md mr-4">
        <img src={assets.list_icon} alt="latest boolings" width="32px" />
        <h1 className="text-xl font-medium">Latest Bookings</h1>
      </div>
      <div>
        {dashboardData.recentAppointments?.length > 0 &&
         dashboardData.recentAppointments.map((eachBooking) => {
            return (
              <div
                key={eachBooking._id}
                className="flex items-center justify-between bg-white mr-4 rounded-b-md px-4 py-2"
              >
                <div className="flex gap-3">
                <img
                  src={eachBooking.userId?.image}
                  alt={eachBooking.userId?.name}
                  width="42px"
                  className="bg-gray-200 rounded-full object-cover h-[42px]"
                />
                <div>
                  <h1 className="text-sm font-medium">
                    {eachBooking.userId?.name}
                  </h1>
                  <p className="text-sm text-gray-800">
                    {moment(eachBooking.slotDate).format("DD MMM YYYY")}
                  </p>
                </div>
                </div>
                {eachBooking.cancelled && (
                  <p className="text-sm font-medium text-red-500">Cancelled</p>
                )}
                {!eachBooking.cancelled && !eachBooking.isCompleted && (
                  <img
                    src={assets.cancel_icon}
                    alt="cancel"
                    width="32px"
                    className="cursor-pointer"
                    onClick={() => doctorCancelAppointment(eachBooking._id)}
                  />
                )}
                {!eachBooking.cancelled && eachBooking.isCompleted &&(
                  <p className="text-sm font-medium text-green-500">Completed</p>
                )}
              </div>
            );
          })}
      </div>
    </div> 

    <div className="sm:hidden h-[80vh] flex items-center">
      <h1 className="text-2xl text-primary text-center mx-10">To access this page please use desktop mode</h1>
    </div>
    </>
  )
};
export default DoctorDashboard
