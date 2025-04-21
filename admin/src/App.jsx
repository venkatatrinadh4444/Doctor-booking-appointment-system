import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Dashboard/>
      <ToastContainer position='top-center' toastClassName="custom-toast"/>
    </div>
  )
}

export default App