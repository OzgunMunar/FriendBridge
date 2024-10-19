import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { ConnectToDB } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

ConnectToDB()

export async function POST(request) {

    try {
        
        const reqBody = await request.json()
        const {
            oldpassword,
            newpassword,
            email,
            token
            } = reqBody;

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newpassword, salt)
        
        const user = await User.findOne({
            passwordToken: token,
            passwordTokenExpiry: {$gt: Date.now()}
        })

        if(!user){
            return NextResponse.json({message: "Token is not up-to-date"}, {status: 400})
        }

        user.password = hashedPassword
        user.passwordToken = undefined
        user.passwordTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Password successfully changed!",
            success: true
        })

    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }

}