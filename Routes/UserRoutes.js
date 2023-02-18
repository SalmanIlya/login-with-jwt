const express=require("express");
const User = require("../module/User");
const cryptojs=require("crypto-js")
const jwt=require("jsonwebtoken")
const authorization=require("../middlewear/middlewear");
const dotenv=require("dotenv")
dotenv.config({path:"config/config.env"})
const app=express.Router()

app.post("/regsister",async(req,res)=>{
try{
const user =await User.create({
    name:req.body.name,
    email:req.body.email,
    password:cryptojs.RC4.encrypt(
        req.body.password,"secritkey"
    ).toString()
})
res.send(user)
}catch(err){
    console.log(err);
}
})


app.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({name:req.body.name})
        const {password,...other}=user._doc
        if(user){
            const pass=cryptojs.RC4.decrypt(password,"secritkey").toString(cryptojs.enc.Utf8)
            if(pass===req.body.password){
                const token=jwt.sign(
                    {
                        id:user.id,
                        isAdmin:user.isAdmin
                    }, process.env.tocken
                )
                res.send({...other,token})

            }else{
                res.send("incorrest password")
            }
        }else{
            res.send("user not found")
        }
}catch(err){
        res.send("server error :",err)
    }})
app.get("/:id",authorization,async(req,res)=>{
    try{
        const user =await User.findById(req.params.id)

        res.send(user)
    }catch(err){
        res.send("server error")
    }
    
})
module.exports=app