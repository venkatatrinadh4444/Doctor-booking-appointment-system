const mongoose=require('mongoose')


const doctorSchema=new mongoose.Schema({
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
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    fees:{
        type:Number,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    availability:{
        type:Boolean,
        default:true
    },
    slotBookings:[
        {
            date:{
                type:Date
            },
            time:{
                type:String
            }
        }
    ]

},{timestamps:true})

const Doctor=mongoose.model('Doctor',doctorSchema)

module.exports=Doctor