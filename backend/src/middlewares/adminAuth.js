const jwt=require('jsonwebtoken')

const adminAuthentication=async(req,res,next)=> {
    try {
        const {token}=req.cookies

        if(!token)
            return res.status(404).json({msg:'Token not found!'})
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.decoded=decoded
        next() 
        return; 

    } catch (err) {
        console.log('Error occured at admin authentication',err)
        return res.status(500).json({msg:"Token not found!"})
    }
}

module.exports=adminAuthentication