require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const doctorRoutes = require('./routes/doctorRoutes')
const cookieParser=require('cookie-parser')
const adminRoutes=require('./routes/adminRoutes')
const cors=require('cors')
const verifyEmailRoutes=require('./routes/userAuthRoutes')
const userRoutes=require('./routes/userRoutes')
const appointmentRoutes=require('./routes/appointmentRoutes')

const app=express()
const PORT=process.env.PORT || 5000

app.use(cors({origin:["https://patient-dashboard-nine.vercel.app","https://admin-dashboard-lime-nu-14.vercel.app"],credentials:true}))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MONGO DB connected successfulyy!')).catch(err=>console.log('Error occured at mongoDB connection',err))

app.use('/doctors',doctorRoutes)
app.use('/admin',adminRoutes)
app.use('/verification',verifyEmailRoutes)
app.use('/user',userRoutes)
app.use('/appointment',appointmentRoutes)



app.listen(PORT,()=>console.log(`Server started and running at ${PORT}`))