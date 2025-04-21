const mongoose=require('mongoose')

const appointmentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    docId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    slotDate:{
        type:Date,
        required:true
    },
    slotTime:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    payment:{
        type:Boolean,
        default:false
    },
    cancelled:{
        type:Boolean,
        default:false
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Appointment=mongoose.model('Appointment',appointmentSchema)

module.exports=Appointment