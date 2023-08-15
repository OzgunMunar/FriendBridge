import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Posts from "@/models/postModel";
import { getDataFromToken } from "@/helpers/helper";


export const GET = async(req) => {

    try {
        
        ConnectToDB()

        const userId = await getDataFromToken(req)
        const posts = await Posts.find({isActive: true, creator: userId})
        // isActive: true, creator: userId
        return NextResponse.json({
            posts
        })

    } catch (error) {
        return new NextResponse("An error occured while fetching posts", {status: 500})
    }

}