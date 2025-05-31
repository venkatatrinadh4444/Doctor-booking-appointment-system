import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContextData } from "../context/Context";
import {toast} from 'react-toastify'

const Navbar = () => {
  const {user,setUser}=useContextData()
  const api=import.meta.env.VITE_API_URI
  const navigate = useNavigate(null);
  const [isShow, setIsShow] = useState(false);

  const logoutHandler=()=> {
    axios.delete(`${api}/user/logout-user`,{withCredentials:true}).then(res=>{
      setUser({})
      toast.success(res.data.msg)
      navigate('/')
    }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong"))
  }

  return (
    <div className='md:mx-10 mx-4'>
      <div className="flex justify-between items-center md:flex md:justify-between md:items-center py-2">
        <img src={assets.logo} alt="logo" className="md:w-[140px] w-[120px] cursor-pointer" onClick={()=>navigate('/')}/>
        <ul className="hidden md:flex gap-3">
          <NavLink to="/">
            <li>HOME</li>
            <hr className="hidden w-5/6 h-[2.5px] bg-blue-500 m-auto rounded" />
          </NavLink>
          <NavLink to="/all-doctors">
            <li>DOCTORS</li>
            <hr className="hidden w-5/6 h-[2.5px] bg-blue-500 m-auto rounded" />
          </NavLink>
          <NavLink to="/about">
            <li>ABOUT</li>
            <hr className="hidden w-5/6 h-[2.5px] bg-blue-500 m-auto rounded" />
          </NavLink>
          <NavLink to="/contact">
            <li>CONTACT</li>
            <hr className="hidden w-5/6 h-[2.5px] bg-blue-500 m-auto rounded" />
          </NavLink>
          <a href="https://admin-dashboard-lime-nu-14.vercel.app" target="_blank" className="border border-slate-900 px-2 rounded-full text-gray-800 hidden md:block">Admin</a>
        </ul>
        <div className="flex gap-2">
          {user?.email ? (
            <div className="flex items-center gap-1 cursor-pointer group">
              <img
                src={user?.image}
                alt="profile"
                width="36px"
                className="rounded-full object-cover h-[36px]"
              />
              <img src={assets.dropdown_icon} alt="menu" width="12px"/>
              <div className="absolute top-8 right-8 pt-[19px] z-10">
              <div className="min-w-48 px-2 py-2 bg-gray-600 text-white hidden group-hover:block rounded z-10">
                <p
                  className="hover:text-black font-semibold"
                  onClick={() => navigate("/my-profile")}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black font-semibold"
                  onClick={() => navigate("/my-appointments")}
                >
                  My Appointments
                </p>
                <p
                  className="hover:text-black font-semibold"
                  onClick={logoutHandler}
                >
                  Logout
                </p>
              </div>
              </div>
            </div>
          ) : (
            <>
            <button
              className="bg-blue-500 px-5 py-2 rounded-full text-white hidden md:block"
              onClick={() => navigate('/login')}
            >
              Login
            </button>

            <button onClick={()=>navigate('/login')}>
            <img src={assets.loginIcon} alt="login" width="28px" className="bg-white md:hidden"/>
          </button>
          </>
          )}
          <img
            src={assets.menu_icon}
            alt="menu"
            width="30px"
            onClick={() => setIsShow(true)}
            className="md:hidden block"
          />

          <div
            className={`${
              isShow ? "fixed w-full" : "h-0 w-0"
            } top-0 right-0 bg-white transition-all duration-500`}
          >
            <div className={`${isShow?'flex flex-col mx-10 h-[100vh] mt-8 gap-6':'hidden'}`}>
              <div className="flex justify-between items-center">
                <img src={assets.logo} alt="logo" width="140px" />
                <img
                  src={assets.cross_icon}
                  alt="close"
                  width="30px"
                  onClick={() => setIsShow(false)}
                />
                </div>
                <ul className="flex flex-col items-center gap-2">
                  <NavLink to="/" onClick={() => setIsShow(false)}>
                    <p>HOME</p>
                  </NavLink>
                  <NavLink to="/all-doctors" onClick={() => setIsShow(false)}>
                    <p>DOCTORS</p>
                  </NavLink>
                  <NavLink to="/about" onClick={() => setIsShow(false)}>
                    <p>ABOUT</p>
                  </NavLink>
                  <NavLink to="/contact" onClick={() => setIsShow(false)}>
                    <p>CONTACT</p>
                  </NavLink>
                </ul>
             </div>
          </div>

        </div>
      </div>
      <hr className="h-[2px] bg-gray-400" />
    </div>
  );
};

export default Navbar;
