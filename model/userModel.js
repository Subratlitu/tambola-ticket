const mongoose=require('mongoose');

const userModel=new mongoose.Schema({
    fname:{type:String,required:"first name is required"},
    lname:{type:String,required:"Last name is required"},
    email:{type:String,required:"email is required",trim:true,unique:true,lowercase:true},
    password:{type:String,required:"password is required",unique:true},

},{timestamps:true})

module.exports=mongoose.model('tambolauser',userModel)