import React, { useEffect, useState } from "react";
import { useContextData } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const api = import.meta.env.VITE_API_URI;
  const {getDoctors}=useContextData()

  const getAppointments=()=> {
    axios
      .get(`${api}/user/get-appointments`, { withCredentials: true })
      .then((res) => setAppointments(res.data))
      .catch((err) => toast.error(err.response.data?.msg));
  }

  useEffect(() => {
    getAppointments()
  }, []);

  const cancelAppointmentFuntion = (id) => {
    axios
      .post(`${api}/appointment/cancel-appointment`, { id })
      .then((res) => {
        getAppointments()
        toast.success(res.data.msg);
        getDoctors()
      })
      .catch((err) =>
        toast.error(err.response.data?.msg || "Something went wrong")
      );
  };

  const verifyingPayment=(order)=> {
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY,
      amount:order.amount,
      currency:'INR',
      name:'Doctor appointment payment',
      description:'Doctor appointment payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:(details)=> {
        const razorpay_order_id=details.razorpay_order_id
        axios.post(`${api}/appointment/verify-order`,{razorpay_order_id}).then(res=>{
          toast.success(res.data.msg)
          getAppointments()
        }).catch(err=>toast.error(err.response.data?.msg || "Something went wrong"))
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }

  const createOrderFuntion=(id)=> {
    const appointmentId=id
    axios.post(`${api}/appointment/create-order`,{appointmentId}).then(res=>{
      verifyingPayment(res.data.order)
    }).catch(err=>console.log(err))
  }



  return (
    <div className="mx-4 md:mx-10 my-5">
      <h1 className="text-xl font-medium mb-3 text-gray-700">
        My appointments
      </h1>
      <hr />
      {appointments?.map((eachAppointment) => {
        return (
          <div key={eachAppointment._id}>
            <div className="grid grid-cols-[2fr_3fr] gap-4 md:flex md:gap-4 md:mb-2 mt-3 items-center">
              <div>
                <img
                  src={eachAppointment.docId.image}
                  alt={eachAppointment.docId.name}
                  className="bg-indigo-100 rounded sm:w-[180px] w-120px"
                />
              </div>
              <div className="flex-1 flex flex-col sm:gap-2 gap-1">
                <h1 className="text-md font-medium">
                  {eachAppointment.docId.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {eachAppointment.docId.speciality}
                </p>
                <b className="text-sm text-gray-600">Address:</b>
                <p className="text-sm text-slate-500">
                  {eachAppointment.docId.address}
                </p>
                <p className="text-gray-900 text-sm font-medium">
                  Date & Time :{" "}
                  <span className="text-gray-500 text-sm">
                    {" "}
                    {moment(eachAppointment.slotDate).format(
                      "DD MMM YYYY"
                    )} | {eachAppointment.slotTime}{" "}
                  </span>
                </p>
              </div>
              <div></div>
              <div className="flex flex-col mt-auto">

                {!eachAppointment.cancelled && eachAppointment.payment && !eachAppointment.isCompleted && <p className="border border-slate-500 px-4 py-2 text-center rounded text-sm bg-indigo-300 text-white mb-2 min-w-40" onClick={()=>createOrderFuntion(eachAppointment._id)}>
                      Paid
                    </p>}

                {!eachAppointment.cancelled && !eachAppointment.payment && !eachAppointment.isCompleted &&(
                  <>
                    <button className="border border-slate-400 px-4 py-2 rounded text-sm text-slate-700 mb-2 hover:bg-primary hover:text-white transition-all duration-300" onClick={()=>createOrderFuntion(eachAppointment._id)}>
                      Pay Online
                    </button>
                    <button
                      className="border border-slate-400 px-4 py-2 rounded text-sm text-slate-700 hover:bg-red-600 hover:text-white transition-all duration-300"
                      onClick={() =>
                        cancelAppointmentFuntion(eachAppointment._id)
                      }
                    >
                      Cancel appointment
                    </button>
                  </>
                )}

                {eachAppointment.cancelled && !eachAppointment.isCompleted &&<button
                      className="border border-slate-400 px-4 py-2 rounded text-sm font-medium text-red-500"
                    >Appointment Cancelled</button>}

                {!eachAppointment.cancelled && eachAppointment.isCompleted && <p className="border border-slate-500 px-4 py-2 rounded text-sm bg-green-500 text-white mb-2 min-w-40 text-center" onClick={()=>createOrderFuntion(eachAppointment._id)}>
                      Completed
                    </p>}
              </div>
            </div>
            <hr className="mt-3" />
          </div>
        );
      })}
    </div>
  );
};

export default MyAppointments;
