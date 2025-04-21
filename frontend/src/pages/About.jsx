import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='mx-4 md:mx-10'>
      <h1 className='text-center text-2xl text-slate-400 font-medium mt-5'>ABOUT <span className='text-slate-900'>US</span></h1>
      <div className='md:flex gap-8 mt-4'>
        <img src={assets.about_image} alt="about" className='md:w-[280px] rounded' />
        <div className='flex flex-col gap-3 py-3'>
          <p className='text-sm text-slate-600'>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p className='text-sm text-slate-600'>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <b>Our Vision</b>
          <p className='text-sm text-slate-600'>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>
      <div className='mt-4'>
        <h1 className='text-2xl text-slate-900 mb-4'>WHY <span className='text-slate-600 font-medium'>CHOOSE US</span></h1>
        <div className='md:flex gap-1'>
          <div className='border border-slate-300 px-8 py-8 hover:bg-primary transition-all duration-500 cursor-pointer group'>
            <p className='font-semibold text-slate-700 group-hover:text-white'>EFFICIENCY:</p>
            <p className='text-sm text-slate-600 mt-2 group-hover:text-white'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='border border-slate-300 px-8 py-8  hover:bg-primary transition-all duration-500 cursor-pointer group'>
            <p className='font-semibold text-slate-700 group-hover:text-white'>CONVENIENCE:</p>
            <p className='text-sm text-slate-600 mt-2 group-hover:text-white'>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='border border-slate-300 px-8 py-8  hover:bg-primary transition-all duration-500 cursor-pointer group'>
            <p className='font-semibold text-slate-700 group-hover:text-white'>PERSONALIZATION:</p>
            <p className='text-sm text-slate-600 mt-2 group-hover:text-white'>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About