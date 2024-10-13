import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/helper";

export const POST = async(req) => {

    const reqBody = await req.json()
    const { postText, imageUrlLink, friend, location } = reqBody

    try {
        
        ConnectToDB()

        const userId = await getDataFromToken(req)

        const newPost = new Posts({
            creator: userId, 
            post: postText, 
            isActive: true,
            comments:[],
            likeNumber: 0,
            imageUrlLink: imageUrlLink,
            location: location,
            friend: friend
        })

        await newPost.save()
        return new NextResponse(JSON.stringify(newPost), {status: 201})

    } catch (error) {
        return new NextResponse({message: "Problem occured while saving."}, {status: 500})
    }

}
