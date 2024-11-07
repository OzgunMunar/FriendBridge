import { ConnectToDB } from "@/dbConfig/dbConfig"
import Posts from "@/models/postModel"
import Users from "@/models/userModel"
import { NextResponse } from "next/server"

export const POST = async(request) => {

    try {
        
        await ConnectToDB()
        
        const { userId } = await request.json()
        const loggedinuser = await Users.findById(userId)
                                        .populate('followingPeople')

        const loggedUserPosts = await Posts.find({ creator: userId })
                                            .populate('creator', 'username userImageLink')
                                            .populate('comments.creator', 'username userImageLink')

        const followingPeople = loggedinuser.followingPeople
        let allPostsMixed = []

        const followingPeoplePostsPromises = followingPeople.map(async(followingPerson) => {

            const followingPersonPosts = await Posts.find({ creator: followingPerson._id })
                                                    .populate('creator', 'username userImageLink')
                                                    .populate('comments.creator', 'username userImageLink')

            return followingPersonPosts

        })

        const followingPosts = await Promise.all(followingPeoplePostsPromises)

        allPostsMixed = [...loggedUserPosts, ...followingPosts.flat()]

        // new post first
        allPostsMixed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return NextResponse.json({ data: allPostsMixed }, { status: 200 })

    } catch (error) {

        console.error(error.message)
        return NextResponse.json(error.message, { status: 200 })

    }

}