import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import SavedPosts from "@/models/savedPostsModel"
import { NextResponse } from "next/server"

export const GET = async(request, response) => {

    try {
      
        await ConnectToDB()
        // const userId = getDataFromToken(request)

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

        return NextResponse.json({ savedPosts, status: 200 })

    } catch (error) {
        // console.log(error.message)
        console.log("api/savedposts error: ", error.message)
        return NextResponse.json({ message: error.message, status: 500 })
    }

}