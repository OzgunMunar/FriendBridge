import {ConnectToDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

ConnectToDB()

export async function POST(request){

    try {

        const reqBody = await request.json()
        const { email, password } = reqBody;

        //check if user exists
        const user = await User.findOne({email})
        
        if(user === null){
            return NextResponse.json({ message: "Credentials are wrong." }, {status: 404})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword) {
            return NextResponse.json({ message: "Password is wrong." }, { status: 400 })
        }
        
        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true, 
        })
        
        return response;

    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}