const app=require("./app")
const dotenv =require("dotenv")
const db = require("./Db/mydb")
dotenv.config({path:"config/config.env"})
db()

app.listen(5000,()=>{
    console.log("5000");
})