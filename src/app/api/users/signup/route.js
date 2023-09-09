import {ConnectToDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

ConnectToDB()

export async function POST(request){

    try {
        
        const reqBody = await request.json()
        const {username, email, password, userImageLink} = reqBody
        
        // "Password is invalid: Minimum eight characters, at least one letter and one number!"
        const passwordPatternRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({message: "User already exists"}, {status: 400})
        }
        
        if(!passwordPatternRegex.test(password)) {
            return NextResponse.json({message: "Password is invalid: Minimum eight characters, at least one letter and one number!"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            userImageLink
        })

        const savedUser = await newUser.save()
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}