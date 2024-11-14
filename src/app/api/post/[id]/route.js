import { ConnectToDB } from "@/dbConfig/dbConfig"
import Posts from "@/models/postModel"
import { NextResponse } from "next/server"


export const DELETE = async(req, {params}) => {

    try {
        
        await ConnectToDB()

        const { id } = params
        
        await Posts.findByIdAndDelete(id)

        return NextResponse.json({success: "Post deleted."}, {status: 200})
            
    } catch (error) {
        return NextResponse.json({error: "An error occured!"}, {status: 500})
    }

}

export const PATCH = async(req, { params }) => {

    try {
        
        await ConnectToDB()

        const { postId, postText, imageUrlLink, friend, location } = await req.json()

        const seekingPost = await Posts.findById(postId)

        if(seekingPost === null)
            return NextResponse.json({error: "Post that you are looking for couldn't found."}, {status: 400})

        seekingPost.post = postText
        seekingPost.location = location
        seekingPost.friend = friend
        seekingPost.imageUrlLink = imageUrlLink

        await seekingPost.save()

        return NextResponse.json({success: "Success when editing!"}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: "An error occured when editing!"}, {status: 500})
    }

}

export async function GET(req, { params }) {

    try {

        await ConnectToDB()

        const { id } = params
        const seekingPost = await Posts.findById(id)
                                        .populate({ 
                                            path: "creator",
                                            select: "username userImageLink userCodeName"
                                        })
                                        .populate({
                                            path: "comments.creator",
                                            select: "username userImageLink userCodeName"
                                        })

        if(!seekingPost)
            return            

        return NextResponse.json({ data: seekingPost }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Problem occured while fetching post." }, { status: 500 })
    }

}