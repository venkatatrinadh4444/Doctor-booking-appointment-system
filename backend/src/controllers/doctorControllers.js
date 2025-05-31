
const Doctor=require('../models/Doctor')
const cloudinary=require('../config/cloudinary')
const bcrypt=require('bcrypt')
const fs=require('fs')
const jwt=require('jsonwebtoken')
const Appointment=require('../models/Appointment')


const addDoctor=async(req,res)=> {
    try {
        const {name,email,password,experience,fees,speciality,degree,address,about}=req.body;

        const imgFile=req.file?.path


        if(!name || !email || !password || !experience || !fees || !speciality || !degree || !address ||!about || !imgFile) {
            fs.unlinkSync(imgFile)    
            return res.status(401).json({msg:'All fields are required!'})
        }

        const imageResponse=await cloudinary.uploader.upload(imgFile)
        const image=imageResponse.secure_url

        const existEmail=await Doctor.findOne({email})
        if(existEmail) {
            fs.unlinkSync(imgFile)    
            return res.status(409).json({msg:"Email already in use"})
        }

        if(password.length<8) {
            fs.unlinkSync(imgFile)
            return res.status(401).json({msg:'Password must be strong'})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const newDoctor=new Doctor({
            name,
            email,
            password:hashedPassword,
            image,
            experience,
            fees,
            speciality,
            degree,
            address,
            about
        })
        await newDoctor.save()

        fs.unlinkSync(imgFile)    

        return res.status(201).json({msg:'New Doctor added successfully!'})    
        
    } catch (err) {
        console.log('Error occured at adding doctor',err)
        fs.unlinkSync(req.file?.path)
        return res.status(500).json({msg:'Server error'})
    }
}

const doctorLogin=async(req,res)=> {
    try {
        const {email,password}=req.body;
        const doctor=await Doctor.findOne({email})
        if(email!==doctor.email || !await bcrypt.compare(password,doctor.password))
            return res.status(401).json({msg:'Invalid credentials'})
        const token=jwt.sign({id:doctor._id,email,password},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'lax',
            maxAge:60*60*1000
        })
        return res.status(200).json({msg:'Login successfull!',user:{email:doctor.email,isAdmin:false}})
    } catch (err) {
        console.log('Error occured at login doctor',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const doctorLogout=async(req,res)=> {
    try {
        const token=req.cookies.token
        if(!token)
            return res.status(404).json({msg:'Token not found!'})
        res.clearCookie('token',{
            httpOnly:true,
            secure:true,
            sameSite:'none'
        })
        return res.status(200).json({msg:'logout successfull!'})
    } catch (err) {
        console.log('Error occured at logout doctor',err)
        return res.status(500).json({msg:'Server error'})
    }
}


const allDoctors=async(req,res)=> {
    try {
        const speciality=req.query.speciality
        if(speciality) {
            const doctors=await Doctor.find({speciality},{password:0})
            return res.status(200).json({msg:'Filtered Doctors',doctors})
        }
        const doctors=await Doctor.find({},{password:0})
        return res.status(200).json({msg:"All doctors",doctors})
    } catch (err) {
        console.log("Error occured at fetching doctors ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const availibilityHandler=async(req,res)=> {
    try {
        const id=req.params.doctorId
        if(!id) 
            return res.status(404).json({msg:"Doctor Id not found!"})

        const doctor=await Doctor.findById(id)
        if(!doctor)
        return res.status(404).json({msg:'Doctor not found!'})

        await Doctor.findByIdAndUpdate(id,{availability:!doctor.availability})
        return res.status(201).json({msg:'Availability Changed!',doctors:await Doctor.find()})

    } catch (err) {
         console.log("Error occured at handling availability of doctors ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const doctorAppointments=async(req,res)=> {
    try {
        const {id}=req.decoded;
        const appointments=await Appointment.find({docId:id}).populate('userId','image name dob')

        return res.status(200).json(appointments)

    } catch (err) {
        console.log("Error occured at fetching doctor appointments ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const cancelAppointment=async(req,res)=> {
    try {
        const {id}=req.decoded;
        const {appointmentId}=req.body;

        const appointment=await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})

       const doctor = await Doctor.findByIdAndUpdate(
        id,
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

       if(!doctor)
        return res.status(404).json({msg:'Doctor not found!'})
      return res.status(200).json({msg:'Appointment cancelled successfully!'})
    } catch (err) {
        console.log("Error occured at cancelling appointment ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const completeAppointment=async(req,res)=> {
    try {
        const {id}=req.decoded;
        const {appointmentId}=req.body;
        const doctor=await Doctor.findById(id)
        if(!doctor)
            return res.status(404).json({msg:'Doctor not found!'})
        const appointment=await Appointment.findByIdAndUpdate(appointmentId,{isCompleted:true})

        if(!appointment)
            return res.status(404).json({msg:'Appointment not found!'})

        const updateDoctor = await Doctor.findByIdAndUpdate(
            id,
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
        
        return res.status(200).json("Appointment completed successfully!")

    } catch (err) {
        console.log("Error occured at completing appointment ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const doctorDashboard=async(req,res)=> {
    try {
        const {id}=req.decoded
        let currency=0;
        const appointments=await Appointment.find({docId:id})
        
        appointments.map(eachAppointment=>{
            if(eachAppointment.payment || eachAppointment.isCompleted)
                currency=currency+eachAppointment.amount
        })

        const totalPatients=[]
        appointments.map(eachAppointment=>{
            if(!totalPatients.includes(eachAppointment.userId.toLocaleString()))
                totalPatients.push(eachAppointment.userId.toLocaleString())
        })

        const recentAppointments=await Appointment.find({docId:id}).sort({createdAt:-1}).limit(5).populate('userId','image name')

        return res.status(200).json({
            currency,
            totalAppointements:appointments.length,
            totalPatients:totalPatients.length,
            recentAppointments
        })
    } catch (err) {
        console.log("Error occured at fetching doctor dashboard ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const fetchingDoctorData=async(req,res)=> {
    try {
        const {id}=req.decoded;
        const doctor=await Doctor.findById(id)
        return res.status(200).json(doctor)
    } catch (err) {
        console.log("Error occured at getting doctor details ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const updatingDoctorDetails=async(req,res)=> {
    try {
        const {id}=req.decoded;
        const {fees,address,availability}=req.body;
        await Doctor.findByIdAndUpdate(id,{
            fees,
            address,
            availability
        })
        return res.status(201).json({msg:'Data updated successfully!'})
    } catch (err) {
        console.log("Error occured at updating doctor data ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

module.exports={addDoctor,doctorLogin,allDoctors,availibilityHandler,doctorAppointments,cancelAppointment,completeAppointment,doctorLogout,doctorDashboard,fetchingDoctorData,updatingDoctorDetails}