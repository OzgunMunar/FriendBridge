import { ConnectToDB } from "@/dbConfig/dbConfig"
import SavedPosts from "@/models/savedPostsModel"
import { NextResponse } from "next/server"

export const POST = async(request) => {

    try {
        
        await ConnectToDB()

        const { userId } = await request.json()

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
        
        if(!savedPosts) {
            savedPosts = { userId: userId, postIds: [] }
        } else {
            savedPosts.postIds.reverse()
        }

        return NextResponse.json({ savedPosts }, { status: 200 })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, status: 500 })
    }

}