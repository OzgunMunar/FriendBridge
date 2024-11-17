import { getDataFromToken } from "@/helpers/helper";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import LikedPosts from "@/models/likedPostsModel";
import Notifications from "@/models/notificationModel";

export async function GET(request) {

    try {
        
        await ConnectToDB()

        const userId = await getDataFromToken(request)
        
        const user = await User.findById(userId)
        .select('-password')

        const userposts = await Posts.find({ creator: userId, postType: 'FeedPost' })
        const userlikes = await LikedPosts.findOne({ userId: userId })
        const userNotificationDocument = await Notifications.findOne({ agentUserId: userId })

        const unreadNotificationNumber = userNotificationDocument.notifications.filter((notification) => notification.isRead === false)

        const userObject = user.toObject()
        userObject.postNumber = userposts.length
        userObject.userlikeNumber = userlikes?.LikedPosts?.length || 0
        userObject.unreadNotificationNumber = unreadNotificationNumber.length
        userObject.userNotificationDocument = userNotificationDocument
        
        return NextResponse.json({
            message: 'User found',
            data: userObject
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}