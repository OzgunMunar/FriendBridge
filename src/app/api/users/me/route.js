import { getDataFromToken } from "@/helpers/helper";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { ConnectToDB } from "@/dbConfig/dbConfig";

ConnectToDB()

export async function GET(request) {

    try {
        
        const userId = await getDataFromToken(request)
        
        const user = await User.findById(userId)
        .select('-password')
        
        return NextResponse.json({
            message: 'User found',
            data: user
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}