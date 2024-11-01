import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import SavedPosts from "@/models/savedPostsModel"
import { NextResponse } from "next/server"


export const GET = async(request) => {

    try {
        
        await ConnectToDB()
        const userId = getDataFromToken(request)

        const savedPosts = await SavedPosts.findOne({ userId })

        if(!savedPosts)
            return NextResponse.json({ message: "No saved post(s) found." })

        return NextResponse.json({ savedPosts })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, status: 500 })
    }

}