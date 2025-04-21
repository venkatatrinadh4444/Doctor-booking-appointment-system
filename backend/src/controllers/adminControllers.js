const jwt=require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const bcrypt=require('bcrypt')
const Appointment=require('../models/Appointment')
const User=require('../models/User')

const adminLogin=async(req,res)=> {
    try {
        const {email,password}=req.body;
        if(!email || !password) 
            return res.status(404).json({msg:'Invalid admin credentials'})
        if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD)
            return res.status(404).json({msg:'Invalid admin credentials'})

        const token=jwt.sign({email,password},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'lax',
            maxAge:60*60*1000
        })
        return res.status(200).json({msg:'Login successfull!',user:{email,isAdmin:true}})
        
    } catch (err) {
        console.log('Error occured at admin login',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const adminLogout=async(req,res)=> {
    try {
        const token=req.cookies.token

        if(!token) 
            return res.status(404).json({msg:'Token not found!'})

        res.clearCookie('token',{
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        return res.status(200).json({msg:'Logout successfull!'})
    } catch (err) {
        console.log('Error occured at logout funtion',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const fechingDetails=async(req,res)=> {
    try {
        const {email,password}=req.decoded

        if(!email || !password) 
            return res.status(404).json({msg:'Admin not found!'})
        
        if(email===process.env.ADMIN_EMAIL &&password===process.env.ADMIN_PASSWORD)
            return res.status(200).json({msg:'Welcome back admin', user:{email,isAdmin:true}})

        const doctor=await Doctor.findOne({email})

        if(email===doctor.email && await bcrypt.compare(password,doctor.password)) {
            return res.status(200).json({msg:'Welcome back doctor',user:{email,isAdmin:false}})
        }
        return res.status(401).json({msg:'Invalid token details'})

    } catch (err) {
        console.log("Error occured at fetching admin details",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const fetchingAllAppointments=async(req,res)=> {
    try {
        const {email,password}=req.decoded;
        if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD)
            return res.status(403).json({msg:'Invalid admin credentials'})
        const allAppointments=await Appointment.find({}).populate('docId','image name fees').populate('userId','image name dob')

        return res.status(200).json({msg:'Showing all appointments',allAppointments})
    } catch (err) {
        console.log("Error occured at fetching all appointments",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const cancelAppointment=async(req,res)=> {
    try {
        const {email,password}=req.decoded;
        const {appointmentId}=req.body;

        if(!appointmentId)
            return res.status(404).json({msg:'appointment id not found!'})

        if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD)
            return res.status(403).json({msg:'Invalid admin credentials'})


       const appointment=await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})

       const doctor = await Doctor.findByIdAndUpdate(
        appointment.docId,
        {
          $pull: {
            slotBookings: {
              date: appointment.slotDate,
              time: appointment.slotTime,
            },
          },
        },
        { new: true }
      );

       if(!appointment)
        return res.status(401).json({msg:'Appointment cancellation failed!'})
      return res.status(200).json({msg:'Appointment cancelled successfully!'})


    } catch (err) {
        console.log("Error occured at cancelling appointment",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const allDetails=async(req,res)=> {
    try {
        const {email,password}=req.decoded;

        if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD)
            return res.status(403).json({msg:'Invalid admin credentials'})

        const doctors=await Doctor.find({})
        const users=await User.find({})
        const appointments=await Appointment.find({})
        const recentAppointments=await Appointment.find({}).sort({createdAt:-1}).limit(5).populate('docId','image name')

        return res.status(200).json({doctors:doctors.length,users:users.length,appointments:appointments.length,recentAppointments})

    } catch (err) {
        console.log("Error occured at fetching admin dashboard",err)
        return res.status(500).json({msg:'Server error'})
    }
}

module.exports={adminLogin,adminLogout,fechingDetails,fetchingAllAppointments,cancelAppointment,allDetails}