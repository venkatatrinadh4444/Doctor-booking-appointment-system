import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const api=import.meta.env.VITE_API_URI
  const [image,setImage]=useState('')
  const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    experience:'1 Year',
    fees:'',
    speciality:'General physician',
    degree:'',
    address:'',
    about:''
  })

  const changeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }


  const submitHandler=(e)=> {
    e.preventDefault()
    if(!image) 
      alert('Please upload a doctor image')

    const formData=new FormData()

    formData.append('image',image)
    formData.append('name',data.name)
    formData.append('email',data.email)
    formData.append('password',data.password)
    formData.append('experience',data.experience)
    formData.append('fees',Number(data.fees))
    formData.append('speciality',data.speciality)
    formData.append('degree',data.degree)
    formData.append('address',data.address)
    formData.append('about',data.about)

    axios.post(`${api}/doctors/add-doctor`,formData,{withCredentials:true}).then(res=>{
      setData({
        name:'',
        email:'',
        password:'',
        experience:'1 Year',
        fees:'',
        speciality:'General physician',
        degree:'',
        address:'',
        about:''
      })
      setImage('')
      toast.success(res.data.msg)
    }).catch(err=>toast.error(err.response.data?.msg ||"Something went wrong try again..."))
  }

  return (
    <>
    <div className="hidden sm:block flex-1">
      <h1 className="mt-6 ml-4 font-medium text-xl text-gray-800 mb-3">
        Add Doctor
      </h1>
      <form className="w-[90%] border border-slate-300 shadow-lg rounded m-auto px-6 max-h-[73vh] sm:max-h-[75vh] overflow-y-scroll" onSubmit={submitHandler}>
        <div className="flex gap-3 items-center my-5 ">
          <label htmlFor="upload">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="upload" className="w-16 rounded-full h-16 object-cover"/>
          </label>
          <input type="file" id="upload" hidden onChange={e=>setImage(e.target.files[0])}/>
          <p className="text-md text-gray-500">
            Upload doctor <br />
            picture
          </p>
        </div>

        <div className="md:flex md:gap-6" >
          {/* input right collection left side */}
          <div className="flex flex-col gap-4 flex-1 text-gray-700">
            <div className="flex flex-col">
              <label htmlFor="name">Doctor name</label>
              <input type="text" id="name" placeholder="Doctor name" className="border-b border-gray-400  outline-none hover:border-primary hover:border-b-2 py-1" required name="name" value={data.name} onChange={changeHandler}/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Doctor Email</label>
              <input type="text" id="email" placeholder="Doctor email" className="border-b border-gray-400  outline-none hover:border-primary hover:border-b-2 py-1" required name="email" value={data.email} onChange={changeHandler}/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Set Password</label>
              <input type="text" id="password" placeholder="Password" className="border-b border-gray-400  outline-none hover:border-primary hover:border-b-2 py-1" required name="password" value={data.password} onChange={changeHandler}/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="experience">Experience</label>
              <select id="experience" className="border-b border-gray-400  outline-none hover:border-primary hover:border-b-2 py-1" required name="experience" value={data.experience} onChange={changeHandler}>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="fees">Fees</label>
              <input type="number" id="fees" placeholder="Doctor fees" className="border-b border-gray-400  outline-none hover:border-primary hover:border-b-2 py-1" required name="fees" value={data.fees} onChange={changeHandler}/>
            </div>
          </div>
          {/* input right collection rigth side */}
          <div className="flex flex-col gap-4 flex-1 text-gray-700 my-4">
          <div className="flex flex-col">
              <label htmlFor="speciality" >Speciality</label>
              <select id="speciality" className="border-b border-gray-400  outline-none hover:border-primary hover:border-b-2 py-1" required name="speciality" value={data.speciality} onChange={changeHandler}>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="degree">Degree</label>
              <input type="text" id="degree" placeholder="Degree" className="border-b border-gray-400  outline-none hover:border-primary hover:border-b-2 py-1" required name="degree" value={data.degree} onChange={changeHandler}/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="address">Address</label>
              <textarea rows="3" type="text" id="address" placeholder="Enter address" className="border border-slate-400  outline-none rounded py-1 px-1" required name="address" value={data.address} onChange={changeHandler}/>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-gray-700 mt-3">
              <label htmlFor="about">About Doctor</label>
              <textarea type="text" id="about" rows="4" placeholder="Write about doctor" className="border border-slate-400  outline-none rounded py-1 px-1 mt-1" required name="about" value={data.about} onChange={changeHandler}/>
        </div>
        <button className="px-6 py-2 bg-primary text-white rounded-full my-4" type="submit">
          Add Doctor
        </button>
      </form>
    </div>
    
    <div className="sm:hidden h-[80vh] flex items-center">
      <h1 className="text-2xl text-primary text-center mx-10">To access this page please use desktop mode</h1>
    </div>
    </>
  );
};

export default AddDoctor;
