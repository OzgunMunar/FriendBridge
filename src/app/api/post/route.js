import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Posts from "@/models/postModel";
import "@/models/groupsModel"
import "@/models/eventModel"

export const POST = async(request) => {

    try {
        
        await ConnectToDB()

        const { userId, paginationInfo } = await request.json()

        let page = parseInt(paginationInfo.page, 10)
        let limit = parseInt(paginationInfo.limit, 10)
        let totalPosts = parseInt(paginationInfo.totalPosts, 10)
        let totalPages = parseInt(paginationInfo.totalPages, 10)

        let posts = await Posts.find({ isActive: true, creator: userId })
                                    .sort({"createdAt": -1})
                                    .populate("relatedGroup")
                                    .populate("relatedEvent")
                                    .populate("creator")
                                    .populate({
                                        path: "comments.creator",
                                        select: "username userImageLink userCodeName"
                                    })

        console.log(posts)
        
        totalPosts = posts.length
        totalPages = Math.ceil(totalPosts / 10)

        posts = posts.slice((page - 1) * limit, page * limit)

        return NextResponse.json({

            posts,
            pagination: {
                page: page,
                limit: limit,
                totalPosts: totalPosts,
                totalPages: totalPages
            }
            
        }, { status: 200 })

    } catch (error) {

        return new NextResponse({ error: error.message }, {status: 500})

    }

}