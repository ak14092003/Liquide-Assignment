const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

const ACCESS_TOKEN = "Iamarpitkkumar";
const REFRESH_TOKEN_SECRET = "IamarpitkkumarRefreshSecret";
const userCtrl = {
register: async(req,res) => {
    try{
        
        const{name,email,password} = req.body;
        const user = await User.findOne({email})
           if(user){
            return res.status(400).json({msg:"Email Already Registered"})
           }
           if(password.length <6){
            return res.status(400).json({msg:"Password Should be atleast 6 characters"});
           }

           const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
           })
           await newUser.save();
           const accesstoken = createAccessToken({id:newUser._id})
           const refreshToken = createRefreshToken({ id: newUser._id });
           newUser.refreshToken = refreshToken;
           await newUser.save();
           res.json({ accesstoken});

        }
        catch(err){
         return res.status(500).json({msg:err.message})
        }
    },

login: async(req,res) => {
    try{
       const{email,password} = req.body

       const user = await User.findOne({email})
       if(!user){
        return res.status(400).json({msg:"User doesn't exist"})
       }
       if (user.password !== password) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
      
       const accesstoken = createAccessToken({id:user._id})
       const refreshToken = createRefreshToken({ id: user._id });
       user.refreshToken = refreshToken;
       await user.save();
       

       res.json({ accesstoken });
      
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
},
refresh: async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) return res.sendStatus(403);

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);

            const accesstoken = createAccessToken({ id: decoded.id });
            res.json({ accesstoken });
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
}
const createAccessToken = (payLoad) =>{
    return jwt.sign(payLoad,ACCESS_TOKEN,{expiresIn:'10m'})
 }

 const createRefreshToken = (payLoad) => {
    return jwt.sign(payLoad, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl