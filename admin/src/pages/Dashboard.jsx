import React from 'react'
import Sidebar from '../components/Sidebar';
import { Routes,Route } from 'react-router-dom';
import Home from './Home';
import Appointments from './Appointments'
import AddDoctor from './AddDoctor'
import Doctors from './Doctors'
import {useContextData} from '../context/Context'
import Login from '../components/Login'
import DoctorDashboard from '../pages/DoctorDashboard'
import DoctorProfile from './DoctorProfile';

const Dashboard = () => {
  const {loggedUser,setLoggedUser}=useContextData()


  return (
    <div className='flex'>
        {loggedUser.email && <Sidebar/>}
        <Routes>
            <Route path='/' element={<Login/>}/>
            {loggedUser?.isAdmin && <Route path='/dashboard' element={<Home/>}/>}
            {!loggedUser?.isAdmin && <Route path='/dashboard' element={<DoctorDashboard/>}/>}
            <Route path='/appointments' element={<Appointments/>}/>
            <Route path='/add-doctor' element={<AddDoctor/>}/>

            <Route path='/doctors' element={loggedUser.isAdmin?<Doctors/>:<DoctorProfile/>}/>
        </Routes>
    </div>
  )
}

export default Dashboard