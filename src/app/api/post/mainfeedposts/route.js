import { ConnectToDB } from "@/dbConfig/dbConfig"
import Posts from "@/models/postModel"
import SavedPosts from "@/models/savedPostsModel"
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

        const savedPosts = await SavedPosts.findOne({ userId })

        const followingPeople = loggedinuser.followingPeople
        let allPostsMixed = []
        let postObject = {}

        const followingPeoplePostsPromises = followingPeople.map(async(followingPerson) => {

            const followingPersonPosts = await Posts.find({ creator: followingPerson._id })
                                                    .populate('creator', 'username userImageLink')
                                                    .populate('comments.creator', 'username userImageLink')

            return followingPersonPosts

        })

        const followingPosts = await Promise.all(followingPeoplePostsPromises)

        allPostsMixed = [...loggedUserPosts, ...followingPosts.flat()]

        // console.log(savedPosts.postIds)

        allPostsMixed = allPostsMixed.map((post) => {

            const isSaved = savedPosts.postIds.includes(post._id)
            postObject = post.toObject()
            postObject.isSaved = isSaved

            return postObject

        })

        // new post first
        allPostsMixed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return NextResponse.json({ data: allPostsMixed }, { status: 200 })

    } catch (error) {

        console.error(error.message)
        return NextResponse.json(error.message, { status: 200 })

    }

}