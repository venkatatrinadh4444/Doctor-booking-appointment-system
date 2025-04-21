const express=require('express')

const {addAppointment, cancelAppointment, createOrder, verifyOrder}=require('../controllers/appointmentControllers')
const userAuth=require('../middlewares/userAuth')

const routes=express.Router()

routes.post('/add-appointment',userAuth,addAppointment)
routes.post('/cancel-appointment',cancelAppointment)
routes.post('/create-order',createOrder)
routes.post('/verify-order',verifyOrder)


module.exports=routes