import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import { NextResponse } from "next/server";


export async function PATCH(req) {

    await ConnectToDB()

    try {
        
        const { postId, comment } = await req.json()
        const post = await Posts.findById(postId)

        post.comments.push(comment)
        await post.save()
        
        return NextResponse.json({ message: "success" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Problem occured while saving the comment."}, {status: 500})
    }

}