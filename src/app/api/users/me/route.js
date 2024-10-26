import { getDataFromToken } from "@/helpers/helper";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";

ConnectToDB()

export async function GET(request) {

    try {
        
        const userId = await getDataFromToken(request)
        
        const user = await User.findById(userId)
        .select('-password')

        const post = await Posts.find({
            creator: userId
        })

        const userObject = user.toObject()
        userObject.postNumber = post.length
        
        return NextResponse.json({
            message: 'User found',
            data: userObject
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}