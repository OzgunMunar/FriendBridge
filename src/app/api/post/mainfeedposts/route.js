import { ConnectToDB } from "@/dbConfig/dbConfig"
import Posts from "@/models/postModel"
import SavedPosts from "@/models/savedPostsModel"
import Users from "@/models/userModel"
import { NextResponse } from "next/server"

export const POST = async(request) => {

    try {
        
        await ConnectToDB()
        
        const { userId, paginationInfo } = await request.json()

        let page = parseInt(paginationInfo.page, 10)
        let limit = parseInt(paginationInfo.limit, 10)
        let totalPosts = parseInt(paginationInfo.totalPosts, 10)
        let totalPages = parseInt(paginationInfo.totalPages, 10)

        const loggedinuser = await Users.findById(userId)
                                        .populate('followingPeople')

        const loggedUserPosts = await Posts.find({ creator: userId })
                                            .populate("relatedGroup")
                                            .populate("relatedEvent")
                                            .populate("creator", "username userImageLink userCodeName")
                                            .populate("comments.creator", "username userImageLink userCodeName")

        const savedPosts = await SavedPosts.findOne({ userId })

        const followingPeople = loggedinuser.followingPeople
        let allPostsMixed = []
        let postObject = {}

        const followingPeoplePostsPromises = followingPeople.map(async(followingPerson) => {

            const followingPersonPosts = await Posts.find({ creator: followingPerson._id })
                                                    .populate("relatedGroup")
                                                    .populate("relatedEvent")
                                                    .populate("creator", "username userImageLink userCodeName")
                                                    .populate("comments.creator", "username userImageLink userCodeName")

            return followingPersonPosts

        })

        const followingPosts = await Promise.all(followingPeoplePostsPromises)

        allPostsMixed = [...loggedUserPosts, ...followingPosts.flat()]

        allPostsMixed = allPostsMixed.map((post) => {

            const isSaved = savedPosts.postIds.includes(post._id)
            postObject = post.toObject()
            postObject.isSaved = isSaved

            return postObject

        })

        // new post first
        allPostsMixed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        totalPosts = allPostsMixed.length
        totalPages = Math.ceil(totalPosts / 10)

        allPostsMixed = allPostsMixed.slice((page - 1) * limit, page * limit)

        return NextResponse.json({ 

            data: allPostsMixed, 
            pagination: {
                page: page,
                limit: limit,
                totalPosts: totalPosts,
                totalPages: totalPages
            }

         }, { status: 200 })

    } catch (error) {

        console.error(error.message)
        return NextResponse.json(error.message, { status: 200 })

    }

}