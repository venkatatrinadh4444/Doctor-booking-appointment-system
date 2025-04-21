
const UserAuth=require('../models/UserAuth')
const otpGenerator=require('otp-generator')
const sendOtp=require('../middlewares/sendOtp')
const User=require('../models/User')

const sendOtpMail=async(req,res)=> {
    try {
        const {email}=req.body;
        if(!email)
            return res.status(404).json({msg:'Email not found!'})
        const userAuthEmail=await UserAuth.findOne({email})
        const user=await User.findOne({email})
        if(userAuthEmail && user)
            return res.status(401).json({msg:'Email is already in use'})
        const otp=otpGenerator.generate(6,{specialChars:false})
        const validity=Date.now()+5*60*1000

        await UserAuth.findOneAndUpdate(
            {email},
            {otp,validity},
            {upsert:true}
        );

        sendOtp(email,otp)
        return res.status(200).json({msg:'OTP sent successfully!'})
    } catch (err) {
        console.log("Error occured at sending otp ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

const verifyEmail=async(req,res)=> {
    try {
        const {email,otp}=req.body;
        const user=await UserAuth.findOne({email})
        if(!email || !otp)
            return res.status(404).json({msg:"Email or otp not found!"})
        if(user.otp!==otp || Date.now()>user.validity)
            return res.status(401).json({msg:'OTP is invalid or expired'})
        user.otp=''
        user.validity=''
        await user.save()
        return res.status(200).json({msg:'OTP verified successfully!'})
    } catch (err) {
        console.log("Error occured at verifying otp ",err)
        return res.status(500).json({msg:'Server error'})
    }
}

module.exports={sendOtpMail,verifyEmail}