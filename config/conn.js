const mongoose=require("mongoose");
const dotenv=require("dotenv");


const connectDatabase=()=>{

mongoose.connect(process.env.DATABASE ,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("Database Connected!"))
}



module.exports=connectDatabase;