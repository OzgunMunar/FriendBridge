import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/helper";
import Users from "@/models/userModel";
import Posts from "@/models/postModel";
import LikedPosts from "@/models/likedPostsModel";
import { NotificationMaker } from "@/helpers/notificationMaker";
import { NotificationAction } from "@/helpers/notificationActions";
import { NotificationActionTypes } from "@/helpers/notificationActionTypes";

export async function POST(req) {

    // Fetch required data from client-side
    const {username, userImageLink, address, personalwebsite, phonenumber, profession, birthday, gender} = await req.json()

    try {

        await ConnectToDB()

        // Fetch required data from token
        const userId = await getDataFromToken(req)

        // Fetch User data
        const user = await Users.findById(userId)
                                .populate("followedBy")

        // Fetch posts User created
        const userposts = await Posts.find({ 
            creator: user._id, 
            postType: { $in: ['FeedPost', 'EventPost'] } 
        })

        // Fetch User Likes User created for the likesposts number.
        const userLikes = await LikedPosts.findOne({ userId: userId })
        let userObject = null

        // Regex patterns
        const birthdayRegexPattern = /^(January|February|March|April|May|June|July|August|September|October|November|December)-\d{2}, \d{4}$/
        const genderRegexPattern = /(Male|Female)/

        if(!birthdayRegexPattern.test(birthday)) {
            return NextResponse.json({message: "Birthday pattern is invalid: Please try the pattern 'January-01, 1900'"}, {status: 400})
        }

        if(!genderRegexPattern.test(gender)) {
            return NextResponse.json({message: "Gender pattern is invalid: Please try the pattern 'Male' or 'Female'"}, {status: 400})
        }
        
        // Supply required changes and execute the process
        user.username = username
        user.userImageLink = userImageLink
        user.address = address
        user.personalwebsite = personalwebsite
        user.phonenumber = phonenumber
        user.profession = profession
        user.birthday = birthday
        user.gender = gender

        // Generate new value to return to display extra features
        userObject = user.toObject()
        userObject.postNumber = userPosts.length
        userObject.userlikeNumber = userLikes?.LikedPosts?.length || 0

        await user.save()

        user.followedBy.forEach((follower) => {

            NotificationMaker(user._id, follower._id, NotificationAction.UserUpdateInfo, NotificationActionTypes.UserRelated, follower._id)

        })

        return NextResponse.json({ data: userObject }, { status: 200 })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}