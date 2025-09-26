import nodemailer, { createTransport } from 'nodemailer'
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
            user:'bhavukdev0@gmail.com',
            pass:'vpnt znbg acdm tepu'
        },
    })
let mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`, // sender address
    to: 'bhavukmittal80313@gmail.com', // receiver address
    subject: 'Test Email from Nodemailer',
    text: `Hello! Welcome to bueasy.Here is your otp for login ${generateotp()}`,
    // html: '<b>Hello!</b>'  // agar HTML bhejna ho to
  };
  let info = await transporter.sendMail(mailOptions);

console.log('Message sent: %s', info.messageId);
}
sendotp().catch(console.error);