const mongoose=require('mongoose')

const userAuthSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String
    },
    validity:{
        type:Date
    }
})

const UserAuth=mongoose.model("UserAuth",userAuthSchema)

module.exports=UserAuth