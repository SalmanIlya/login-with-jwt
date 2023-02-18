const jwt =require("jsonwebtoken") 
const dotenv=require("dotenv")
dotenv.config({path:"config/config.env"})
const authorization = (req, res, next) => {
const token =req.headers.token
if(token){
  const decoded = jwt.verify(token,process.env.tocken)
  if(decoded){
    next()
  }else{
    res.status(404).json("you are not valid")
  }
}else{
  res.status(404).json("you are not allow to do that")
}

   }
   
  module.exports=authorization