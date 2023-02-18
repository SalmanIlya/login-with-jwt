const mongoose=require("mongoose")

const db=()=>{
    mongoose.connect(process.env.my_Db).then(()=>{
        console.log("connection is successfull");
    }).catch((error)=>{
console.log("error :",error);
    })
}
module.exports=db