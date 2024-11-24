import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/helper";

export const POST = async(req) => {

    const reqBody = await req.json()
    const { postText, imageUrlLink, friend, location, likedBy, dislikedBy,comments, postType, groupId, eventId } = reqBody

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
            relatedGroup: groupId ? groupId : null,
            relatedEvent: eventId ? eventId : null
        })

        await newPost.save()
        return new NextResponse(JSON.stringify(newPost), {status: 200})

    } catch (error) {
        console.log(error.message)
        return new NextResponse({message: "Problem occured while saving."}, {status: 500})
    }

}
