const nodemailer=require('nodemailer')

const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:'venkatatrinadh4444@gmail.com',
        pass:'rtecerbfluiivezr'
    }
})

const sendEmail=(email,otp)=>{
    const options={
        from:'venkatatrinadh4444@gmail.com',
        to:email,
        subject:'OTP verification required',
        html:`<div>
        <b>Your OTP is valid upto 5 minutes.</b>
        <p style="text-align:center;font-size:18px;color:green;border:1px solid silver;padding:8px 6px;font-weight:bold">${otp}</p>
        </div>`
    }
    return transport.sendMail(options)
}


module.exports=sendEmail