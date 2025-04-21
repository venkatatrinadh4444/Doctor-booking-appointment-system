const express=require('express')
const {addDoctor,doctorLogin, allDoctors, availibilityHandler, doctorAppointments, cancelAppointment, completeAppointment, doctorLogout, doctorDashboard, fetchingDoctorData, updatingDoctorDetails}=require('../controllers/doctorControllers')
const upload=require('../middlewares/multer')
const adminAuthentication=require('../middlewares/adminAuth')

const doctorRoutes=express()

doctorRoutes.post('/add-doctor',adminAuthentication,upload.single('image'),addDoctor)
doctorRoutes.post('/doctor-login',doctorLogin)
doctorRoutes.get('/all-doctors',allDoctors)
doctorRoutes.put('/:doctorId/change-availability',availibilityHandler)
doctorRoutes.get('/doctor-appointments',adminAuthentication,doctorAppointments)
doctorRoutes.post('/cancel-appointment',adminAuthentication,cancelAppointment)
doctorRoutes.post('/complete-appointment',adminAuthentication,completeAppointment)
doctorRoutes.delete('/doctor-logout',doctorLogout)
doctorRoutes.get('/doctor-dashboard',adminAuthentication,doctorDashboard)
doctorRoutes.get('/doctor-details',adminAuthentication,fetchingDoctorData)
doctorRoutes.put('/update-doctor-details',adminAuthentication,updatingDoctorDetails)

module.exports=doctorRoutes