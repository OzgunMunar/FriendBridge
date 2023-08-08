import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { getDataFromToken } from "@/helpers/helper";

ConnectToDB()

export async function POST(req) {

    try {
        
        const userId = await getDataFromToken(req)
        const user = await User.findById(userId)
        
        const email = user.email

        if(!user) {
            return NextResponse.json({error: "User doesn't exists"}, {status: 400})
        }
        
        await sendEmail({email, emailType: "RESET", userId: user._id})
        
        return NextResponse.json({
            message: "User is informed by mail successfuly.",
            success: true
        })
        
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}