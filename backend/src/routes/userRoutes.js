const express=require('express')
const {registerUser,loginUser,editUser, saveDetails, logoutUser, getAppointments}=require('../controllers/userControllers')
const userToken=require('../middlewares/userAuth')
const upload=require('../middlewares/multer')
const User = require('../models/User')

const routes=express()

routes.post('/register-user',registerUser)
routes.post('/login-user',loginUser)
routes.delete('/logout-user',logoutUser)
routes.get('/edit-user',userToken,editUser)
routes.put('/save-changes',userToken,upload.single('image'),saveDetails)
routes.get('/get-user',userToken,async(req,res)=>{
    try {
        const id=req.id
        const user=await User.findById(id)
        if(!user)
            return res.status(404).json({msg:"User not found!"})
        return res.status(200).json({user})
    } catch (err) {
        console.log("Error at fetching user ",err)
        return res.status(500).json({msg:'Server error'})
    }
})
routes.get('/get-appointments',userToken,getAppointments)

module.exports=routes