import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="mx-4 md:mx-10 my-6">
      <h1 className="text-center text-2xl font-normal mb-4 text-slate-400">CONTACT <span className="text-slate-900 font-medium">US</span></h1>

      <div className="md:flex gap-8 justify-center">
        <img
          src={assets.contact_image}
          alt="contact"
          className="md:w-[280px] rounded"
        />
        <div className="flex flex-col gap-4 py-4">
          <h1 className="font-semibold text-lg text-slate-700">OUR OFFICE</h1>
          <div>
            <p className="text-md text-slate-600">00000 Willms Station</p>
            <p className="text-md text-slate-600">Suite 000, Washington, USA</p>
          </div>
          <div>
            <p className="text-md text-slate-600">Tel: (000) 000-0000</p>
            <p className="text-md text-slate-600">
              Email: greatstackdev@gmail.com
            </p>
          </div>
          <h1 className="font-semibold text-lg text-slate-700">
            CAREERS AT PRESCRIPTO
          </h1>
          <p className="text-md text-slate-600">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-6 py-4 text-sm text-black w-40 hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
