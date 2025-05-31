
const jwt=require('jsonwebtoken');

const userToken=async(req,res,next)=> {
    try {
        const {user_token}=req.cookies
        if(!user_token)
            return res.status(404).json({msg:'Token not found!'})
        const decoded=jwt.verify(user_token,process.env.JWT_SECRET)
        if(!decoded)
            return res.status(404).json({msg:'Invalid or expired token'})
        req.id=decoded.id
        next()
        return;
    } catch (err) {
        console.log('Error occured at user token verification',err)
        return res.status(500).json("Server error")
    }
}

module.exports=userToken