import { ConnectToDB } from "@/dbConfig/dbConfig"
import SavedPosts from "@/models/savedPostsModel"
import { NextResponse } from "next/server"

export const POST = async(request) => {

    try {
        
        await ConnectToDB()

        const { userId, paginationInfo } = await request.json()

        let page = parseInt(paginationInfo.page, 10)
        let limit = parseInt(paginationInfo.limit, 10)
        let totalPosts = parseInt(paginationInfo.totalPosts, 10)
        let totalPages = parseInt(paginationInfo.totalPages, 10)

        let savedPosts = await SavedPosts.findOne({ userId })
                                        .populate({
                                            path: "postIds",
                                            populate: {
                                                path: "creator"
                                            }
                                        })
                                        .populate({
                                            path: "postIds",
                                            populate: {
                                                path: "comments.creator"
                                            }
                                        })
                                        .populate({
                                            path: "postIds",
                                            populate: {
                                                path: "relatedEvent"
                                            }
                                        })
                                        .populate({
                                            path: "postIds",
                                            populate: {
                                                path: "relatedGroup"
                                            }
                                        })
        
        if(!savedPosts) {
            savedPosts = { userId: userId, postIds: [] }
        } else {
            savedPosts.postIds.reverse()
        }

        totalPosts = savedPosts.postIds.length
        totalPages = Math.ceil(totalPosts / 10)

        savedPosts.postIds = savedPosts.postIds.slice((page - 1) * limit, page * limit)

        return NextResponse.json({ 
            savedPosts ,
            pagination: {
                page: page,
                limit: limit,
                totalPosts: totalPosts,
                totalPages: totalPages
            }
        }, { status: 200 })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, status: 500 })
    }

}