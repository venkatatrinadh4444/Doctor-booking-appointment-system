const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://res.cloudinary.com/dxzynb5wu/image/upload/v1744283693/etc1xuuw1rcozjavzskz.jpg"
    },
    phone:{
        type:String,
        default:"0000000000"
    },
    address:{
        type:String
    },
    gender:{
        type:String,
        default:"Not Selected"
    },
    dob:{
        type:Date,
        default:Date.now()
    }

})

const User=mongoose.model('User',userSchema)

module.exports=User