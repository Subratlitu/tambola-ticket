let userModel=require("../model/userModel")
const validUrl=require('../validator/validUrl')
const bcrypt=require('bcrypt')

module.exports = {
    signUp: async (req, res) => {
      try {
        let {fname,lname,email,password}=req.body
        if(!validUrl.isValid(fname)){
            res.status(400).send({status:false,message:"first name is required"})
            return
        }
        if(!validUrl.isValid(lname)){
            res.status(400).send({status:false,message:"last name is required"})
            return
        }
        if(!validUrl.isValid(email)){
            res.status(400).send({status:false,message:"email is required"})
            return
        }
        if(!validUrl.isValidEmail(email)){
            res.status(400).send({status:false,message:"enter a valid email address"})
            return
        }
        if(!validUrl.isValid(password)){
            res.status(400).send({status:false,message:"password is required"})
            return
        }
        if(!validUrl.isValidPassword(password)){
            res.status(400).send({status:false,message:"enter a password in between 5 and 15"})
            return
        }
        
    
        let isalreadyExistEmail=await userModel.findOne({email:email})
        if(isalreadyExistEmail){
            res.status(400).send({status:false,message:"email is already exist"})
            return
        }
        //password masking
        let saltRounds=10
        let salt=await bcrypt.genSalt(saltRounds)
        let hash=await bcrypt.hash(password,salt)
        password=hash
    
        const newUser={fname,lname,email,password}
        let userData=await userModel.create(newUser)
        if(userData){
            return res.status(201).send({status:true,message:"data created successfully",data:userData})
        }
        
  
      } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
      }
    },
    login:async (req, res) => {
        try {
            let {email,password}=req.body

            if(!validUrl.isValid(email)){
                res.status(400).send({status:false,message:"email is required"})
                return
            }
            if(!validUrl.isValidEmail(email)){
                res.status(400).send({status:false,message:"enter a valid email address"})
                return
            }
            if(!validUrl.isValid(password)){
                res.status(400).send({status:false,message:"password is required"})
                return
            }
         
        
            let user=await userModel.findOne({email:email})
        
            if(!user){
                res.status(404).send({status:false,message:"user does not exist"})
                return
            }
            //decrypting password
            let isValidPassword= await bcrypt.compare(password,user.password)
            if(!isValidPassword){
                return res.status(400).send({status:false,message:"wrong password"})
            }
        

            res.status(200).json({status:true,message:"user login succesfully"});
            
      
          } catch (error) {
            console.log(error);
            return res.status(500).send("Server Error");
          }
    }
  
  };