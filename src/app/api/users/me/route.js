import { getDataFromToken } from "@/helpers/helper";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import LikedPosts from "@/models/likedPostsModel";

export async function GET(request) {

    try {
        
        await ConnectToDB()

        const users = await User.find()

        users.forEach(async (user) => {
            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            await user.save(); 
        });

        const userId = await getDataFromToken(request)
        
        const user = await User.findById(userId)
        .select('-password')

        const userposts = await Posts.find({ creator: userId, postType: 'FeedPost' })
        const userlikes = await LikedPosts.findOne({ userId: userId })

        const userObject = user.toObject()
        userObject.postNumber = userposts.length
        userObject.userlikeNumber = userlikes?.LikedPosts?.length || 0
        
        return NextResponse.json({
            message: 'User found',
            data: userObject
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}