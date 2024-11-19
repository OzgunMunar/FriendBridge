import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import LikedPosts from "@/models/likedPostsModel";

export async function GET(request, { params }) {

    try {
        
        await ConnectToDB()

        const { userCodeName } = params
        
        const user = await User.findOne({userCodeName: userCodeName})
        .select('-password')

        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 })
        }
        
        const userposts = await Posts.find({ creator: user._id, postType: 'FeedPost' })
        const userlikes = await LikedPosts.findOne({ userId: user._id })

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