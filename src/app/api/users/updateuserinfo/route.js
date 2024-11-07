import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/helper";
import Users from "@/models/userModel";
import Posts from "@/models/postModel";
import LikedPosts from "@/models/likedPostsModel";

export async function POST(req) {

    const reqBody = await req.json()
    const {username, userImageLink, address, personalwebsite, phonenumber, profession, birthday, gender} = reqBody

    try {

        await ConnectToDB()

        const userId = await getDataFromToken(req)
        const user = await Users.findById(userId)
        const userPosts = await Posts.find({ creator: userId, postType: 'FeedPost' })
        const userLikes = await LikedPosts.findOne({ userId: userId })
        let userObject = null

        const birthdayRegexPattern = /^(January|February|March|April|May|June|July|August|September|October|November|December)-\d{2}, \d{4}$/
        const genderRegexPattern = /(Male|Female)/

        if(!birthdayRegexPattern.test(birthday)) {
            return NextResponse.json({message: "Birthday pattern is invalid: Please try the pattern 'January-01, 1900'"}, {status: 400})
        }

        if(!genderRegexPattern.test(gender)) {
            return NextResponse.json({message: "Gender pattern is invalid: Please try the pattern 'Male' or 'Female'"}, {status: 400})
        }
        
        user.username = username
        user.userImageLink = userImageLink
        user.address = address
        user.personalwebsite = personalwebsite
        user.phonenumber = phonenumber
        user.profession = profession
        user.birthday = birthday
        user.gender = gender

        userObject = user.toObject()
        userObject.postNumber = userPosts.length
        userObject.userlikeNumber = userLikes?.LikedPosts?.length || 0

        await user.save()

        return NextResponse.json({ data: userObject }, { status: 200 })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}