const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
        
    },
    password:{
        type:String,
        required:true
    },
    refreshToken: {
        type: String,
        required: false
    }
})


const User= mongoose.model('users',UserSchema)
module.exports = User;