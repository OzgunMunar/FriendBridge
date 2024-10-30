import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

export async function POST(req) {

    try {

        await ConnectToDB()
        
        const reqBody = await req.json()
        const {token} = reqBody

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })

        if (!user) {
            return NextResponse.json(
                {error: "Invalid token"},
                {status: 400}
            )
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
    }

}