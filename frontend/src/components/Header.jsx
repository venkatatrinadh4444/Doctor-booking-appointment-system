import React from "react";
import { assets } from "../assets/assets";


const Header = () => {
  return (
    <div className="mx-4 md:mx-10 bg-primary px-10 mt-3 rounded pt-10 md:flex items-center">
      <div>
        <h1 className="text-xl md:text-3xl font-medium text-white text-center xm:text-start xm:text-2xl">
          Book Appointment With Trusted Doctors
        </h1>
        <div className="md:flex items-center mt-4 mb-3 gap-2 text-white ">
          <img
            src={assets.group_profiles}
            className="mx-auto"
          />
          <p className="text-center sm:text-start">
            Simply browse through our extensive list of trusted doctors,schedule your appointment hassle-free.
          </p>
        </div>
          <a href="#speciality" className="flex gap-2 items-center w-48 bg-white text-slate-500 px-4 py-3 rounded-full mb-4 mx-auto md:mx-0 hover:scale-105 transition-all duration-300">Book appointment
          <img src={assets.arrow_icon} alt="arrow" width="20px" />
          </a>
      </div>
      <div className="mt-auto">
        <img src={assets.header_img} alt="doctors" width="100%" />
      </div>
    </div>
  );
};

export default Header;
