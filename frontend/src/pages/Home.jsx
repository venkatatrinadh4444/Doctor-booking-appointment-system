import React from 'react'
import Header from '../components/Header'
import Speciality from '../components/Speciality'
import Doctors from '../components/Doctors'
import AppointmentBanner from '../components/AppointmentBanner'

const Home = () => {
  return (
   <>
   <Header/>
   <Speciality/>
   <Doctors/>
   <AppointmentBanner/>
   </>
  )
}

export default Home