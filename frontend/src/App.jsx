import React from 'react';
import './App.css'
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment';
import Footer from './components/Footer';
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/all-doctors' element={<Doctors/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path="/doctors/:speciality" element={<Doctors/>}/>
        <Route path="/appointment/:docId" element={<Appointment/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        <Route path="/my-appointments" element={<MyAppointments/>}/>
      </Routes>
      <Footer/>
      <ToastContainer position='top-center' toastClassName="custom-toast"/>
    </div>
  )
}

export default App