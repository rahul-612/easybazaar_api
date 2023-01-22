const app=require("./app");
const connectDatabase=require("./config/conn")
const cloudinary = require("cloudinary");
 const chatServer= require ("./chatServer.js");


//Handling the caught exceptions like console.log(youtube);
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);

        process.exit(1);
})


//Config
// if(process.env.NODE_ENV!=="PRODUCTION"){
//     require("dotenv").config({path:"backend/config/config.env"});
// }
    require("dotenv").config({path:"./config/config.env"});




//Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is Listening at ${process.env.PORT}`)
})
// const server=app.listen(4000,()=>{
//     console.log(`Server is Listening at ${4000}`)
// })

chatServer(server)


//unhandled promise rejection- ye wo error h jisko handle nhi kia ja skta jaise database ka url glt ho jaye glti se
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})