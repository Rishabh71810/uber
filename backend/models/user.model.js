const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const { use } = require('../app');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 letters']
        },
        lastname:{
            type:String,
            minlength:[3,'First name must be at least 3 letters']
        }
    },
    email:{
        type:String,
        required: true,
        unique: true,
        minlength:[5,'email must be at least 5 letters long']
    },
    password:{
        type:String,
        required: true,
    },
    socketId:{
        type:String
    },
})

userSchema.methods.generateAuthToken= function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function(){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.hashPassword = async function(){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user',userSchema)

module.exports =userModel;