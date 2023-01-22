const ErrorHandler=require("../utils/errorHandler");
const catchAsyncError=require("./catchAsyncErrors");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");


exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    // console.log(token);

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401))
    }

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);

   req.user= await User.findById(decodedData.id);

   next();
});

// exports.authorizeUserRoles=(...xyz)=>{
    
//     return(req,res,next)=>{
//         //yani is roles array me wo user ki role ki value ky h jaise roles m admin hua to ky req.user.role m bhi admin h
//         console.log(xyz)
//         if(!xyz.includes(req.user.role)){
//            return next (new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
//             //403 means server ne smjh lia hum ky krna chhaa rhe pr refuse kr dia 
//         };

//             //yani ...roles m jaise admin h to phir hum check kr rhe ki req.user.role m bhi admin h ky to ye if block ni chlega aur next chl jayega yani next command kyuki ye ek middleware h
//         next();
//     };
// }


exports.authorizeRoles=(...roles)=>{
    
    return(req,res,next)=>{
        //yani is roles array me wo user ki role ki value ky h jaise roles m admin hua to ky req.user.role m bhi admin h
        if(!roles.includes(req.user.role)){
           return next (new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
            //403 means server ne smjh lia hum ky krna chhaa rhe pr refuse kr dia 
        };

            //yani ...roles m jaise admin h to phir hum check kr rhe ki req.user.role m bhi admin h ky to ye if block ni chlega aur next chl jayega yani next command kyuki ye ek middleware h
        next();
    };
}
