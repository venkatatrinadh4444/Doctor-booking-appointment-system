import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <>
    <div className='grid gap-3 md:grid md:grid-cols-3 mx-4 md:mx-10 overflow-hidden mt-8'>
        <div>
            <img src={assets.logo} alt="logo" width="180px"/>
            <p className='text-slate-500 text-sm mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div>
            <h1 className='text-xl font-medium'>COMPANY</h1>
            <ul className='text-gray-700 px-4 py-2'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <h1 className='text-xl font-medium'>GET IN TOUCH</h1>
            <ul className='text-gray-700 py-2 pl-4'>
                <li>+91 9182320883</li>
                <li>bodagalavenkatatrinadh@gmail.com</li>
            </ul>
        </div>
    </div>
    <div className='mx-4 md:mx-10 mt-3'>
        <hr className='h-0.5 bg-gray-500 rounded-full'/>
        <p className='text-center mt-2 mb-4'>Copyright 2025 @ bodagalavenkatatrinadh - All Rights Reserved.</p>
    </div>
    </>
  )
}

export default Footer