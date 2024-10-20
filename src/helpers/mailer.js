// domain.com/verifytoken/asf   server component
// domain.com/veriftToken?token=asfasnkfja  client component

import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }) => {

  try {
    
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    let htmlText = ""

    if(emailType === "VERIFY") {

      await User.findByIdAndUpdate(

        userId, 
        { 
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000  //milliseconds to make it works
        }
      
      )

      htmlText = `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to 
      verify your email`
      
    }
    else if(emailType === "RESET") {

      await User.findByIdAndUpdate(

        userId, 
        { 
          passwordToken: hashedToken,
          passwordTokenExpiry: Date.now() + 3600000  //milliseconds to make it works
        }
      
      )

      htmlText = `<p>Click <a href="${process.env.domain}/changepassword?token=${hashedToken}">here</a> to 
      reset your password`

    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      // service: 'gmail',
      auth: {
        user: 'ozgunmnr@gmail.com',
        pass: process.env.email_password
      }
    });
  
    const mailOptions = {

      from: '"Friend Bridge" <ozgunmnr@gmail.com>', // sender address
      to: email, // list of receivers
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: htmlText

    }
    
    const result = await transporter.sendMail(mailOptions)

    return result

  } catch (error) {
    console.log(error.message)
  }

}