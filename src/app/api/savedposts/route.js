import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import SavedPosts from "@/models/savedPostsModel"
import { NextResponse } from "next/server"

export const GET = async(request) => {

    try {
      
        await ConnectToDB()
        const userId = getDataFromToken(request)

        let savedPosts = await SavedPosts.findOne({ userId })
                                       .sort({ "createdAt": -1 })
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

        if(!savedPosts)
            savedPosts = { userId: userId, postIds: [] }

        return NextResponse.json({ savedPosts, status: 200 })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, status: 500 })
    }

}