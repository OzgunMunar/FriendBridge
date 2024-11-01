import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/helper";

export const POST = async(req) => {

    const reqBody = await req.json()
    const { postText, imageUrlLink, friend, location, likedBy, dislikedBy,comments, postType, groupId } = reqBody

    try {
        
        await ConnectToDB()

        const userId = await getDataFromToken(req)
        const newPost = new Posts({
            creator: userId, 
            post: postText, 
            postType: postType, 
            isActive: true, 
            comments: [], 
            likedBy: [], 
            dislikedBy:[],
            imageUrlLink: imageUrlLink, 
            location: location, 
            friend: friend, 
            postedDate: Date.now(), 
            groupId: groupId ? groupId : null 
        })

        await newPost.save()
        return new NextResponse(JSON.stringify(newPost), {status: 201})

    } catch (error) {
        console.log(error)
        return new NextResponse({message: "Problem occured while saving."}, {status: 500})
    }

}
