const nodeMailer=require("nodemailer");

   //options ek object h jo ki userController k forgot Password function me se sendEmail function ko pass kr rhe h
   //SMPT means simple mail transfer protocol
const sendEmail=async (options)=>{
     const transporter=nodeMailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_APP_PASS,
        },
    });

    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

   await transporter.sendMail(mailOptions);     //isse mail chl jayegi
};


module.exports=sendEmail;