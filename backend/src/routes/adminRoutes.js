const express=require('express')
const {adminLogin,adminLogout,fechingDetails, fetchingAllAppointments, cancelAppointment, allDetails}=require('../controllers/adminControllers')
const adminAuth=require('../middlewares/adminAuth')

const adminRoutes=express()

adminRoutes.post('/admin-login',adminLogin)
adminRoutes.delete('/admin-logout',adminLogout)
adminRoutes.get('/verify-details',adminAuth,fechingDetails)
adminRoutes.get('/all-appointments',adminAuth,fetchingAllAppointments)
adminRoutes.post('/cancel-appointment',adminAuth,cancelAppointment)
adminRoutes.get('/admin-dashboard',adminAuth,allDetails)

module.exports=adminRoutes