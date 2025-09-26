import nodemailer, { createTransport } from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const generateotp=()=>{
    let ans='';
    for(let i=0;i<6;i++){
        ans+=Math.floor(Math.random()*10)
    }
    return ans;
}
const sendotp=async()=>{
let transporter=createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        },
    })
let mailOptions = {
    from: "Your App", // sender address
    to: process.env.RECEIVER_TEMP, // receiver address
    subject: 'Test Email from Nodemailer',
    text: `Hello! Welcome to bueasy.Here is your otp for login ${generateotp()}`,
    // html: '<b>Hello!</b>'  // agar HTML bhejna ho to
  };
  let info = await transporter.sendMail(mailOptions);

}
sendotp().catch(console.error);