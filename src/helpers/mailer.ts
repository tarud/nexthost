import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'


export const sendEmail =  async({email, emailType, userId }:any) =>
    {
        try {
            const hashedToken = await bcryptjs.hash(userId.toString(), 10)
            if(emailType === "VERIFY"){
              await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenEpiry: Date.now() + 3600000})

            } else if(emailType === "RESET") {
              await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenEpiry: Date.now() + 3600000})
            }

            var transport = nodemailer.createTransport({
              host: "sandbox.smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "13a0a78075b631",
                pass: "********586f"
              }
            });

              const mailOptions = {
                from: 'tarush@tarush.ai',
                to: email,
                subject: emailType === 'VERIFY' ? "verify your email" : "reset your password",
                html:`<p>Click <a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "verify" ? "verify your email" : "reset your password"} or copy and paste link in browser. <br> ${process.env.DOMAIN}/verifyemail?token=$</p>`,
                
              }

              const mailResponse = await transport.sendMail(mailOptions)
              return mailResponse
              
        } catch (error:any) {
            throw new Error(error.message)

        }
    }