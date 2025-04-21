const express=require('express')
const {sendOtpMail, verifyEmail}=require('../controllers/userAuthContollers')

const routes=express.Router()

routes.post('/send-mail',sendOtpMail)
routes.post('/verify-mail',verifyEmail)

module.exports=routes