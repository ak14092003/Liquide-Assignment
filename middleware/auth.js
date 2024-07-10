const jwt = require('jsonwebtoken')


const ACCESS_TOKEN = "Iamarpitkkumar";

const auth = (req,res,next) => {
   try{
    const token = req.header("Authorization")
    if(!token) return res.status(400).json({msg:"Invaid Authentication"})

    jwt.verify(token,ACCESS_TOKEN,(err,user)=>{
        if(err)  return res.status(400).json({msg:"Invalid Authentication"})

        req.user = user 
        next()
    })
   } 
   catch(err){
        return res.status(500).json({msg:"err.message"})
   }
}
module.exports = auth;