const Doctor = require('../models/Doctor');
const User=require('../models/User')
const UserAuth=require('../models/UserAuth')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cloudinary=require('../config/cloudinary')
const Appointment=require('../models/Appointment')
const fs=require('fs')

const registerUser=async(req,res)=> {
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password)
            return res.status(401).json({msg:"All fields are required!"})

        const user=await User.findOne({email})
        if(user)
            return res.status(401).json({msg:'Email already in use'})
        const userEmail=await UserAuth.findOne({email})
        if(!userEmail)
            return res.status(401).json({msg:'Please verify the email first'})
        if(password.length<8)
            return res.status(401).josn({msg:'Password must be strong'})
        const encryptPass=await bcrypt.hash(password,10)
        const newUser=new User({
            name,
            email,
            password:encryptPass
        })
        await newUser.save()
        return res.status(201).json({msg:'User registered successfully!'})
    } catch (err) {
        console.log('Error occured at registering user ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password) 
            return res.status(404).json({msg:'Enter valid credentials'})
        const user=await User.findOne({email})
        if(!user || !await bcrypt.compare(password,user.password))
            return res.status(404).json({msg:'Invalid credentials'})
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('user_token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'lax',
            maxAge:60*60*1000
        })
        return res.status(200).json({msg:'Login successfull!',user})
    } catch (err) {
        console.log('Error occured at login user ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const logoutUser=async(req,res)=> {
    try {
        const user_token=req.cookies.user_token

        if(!user_token) 
            return res.status(404).json({msg:'Token not found!'})

        res.clearCookie('user_token',{
            httpOnly:true,
            secure:true,
            sameSite:'None'
        })
        return res.status(200).json({msg:'Logout successfull!'})
    } catch (err) {
        console.log('Error occured at logout funtion',err)
        return res.status(500).json({msg:'Server error'})
    }
}


const editUser=async(req,res)=> {
    try {
        const id=req.id
        const user=await User.findById(id)
        if(!user)
            return res.status(404).json({msg:'User not found!'})
        return res.status(200).json({msg:"Please edit your profile details",user})
    } catch (err) {
        console.log('Error at editing profile ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const saveDetails=async(req,res)=> {
    try {
        const imageFile=req.file?.path
        const {name,phone,gender,dob,email,password}=req.body;
        let imageUrl;
        if(imageFile) {
            const imageRef=await cloudinary.uploader.upload(imageFile)
            imageUrl=imageRef.secure_url;
        }

        const id=req.id
        const user=await User.findByIdAndUpdate(id,{
            image:imageUrl,
            name,
            email,
            password,
            phone,
            gender,
            dob     
        },{new:true})
        if(!user)
            return res.status(404).json({msg:'User not found!'})
        fs.unlinkSync(imageFile&&imageFile)
        return res.status(201).json({msg:'Changes saved!',user})
    } catch (err) {
        console.log('Error at saving the chages ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const getAppointments=async(req,res)=> {
    try {
        const id=req.id;

        const userAppointments=await Appointment.find({userId:id}).sort({createdAt:-1}).populate('docId','image name speciality address')

        return res.status(200).json(userAppointments)

    } catch (err) {
        console.log('Error at getting appointments ',err)
        return res.status(500).json({msg:'Server error'})
    }
}

module.exports={registerUser,loginUser,editUser,saveDetails,logoutUser,getAppointments}