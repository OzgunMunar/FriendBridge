import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import Posts from "@/models/postModel"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {
        
        await ConnectToDB()
        
        const { postId } = await req.json();
        const Post = await Posts.findById(postId)
        const userId = await getDataFromToken(req);

        if(!Post)
            return
        
        if(!Post.likedBy.includes(userId)) {

            Post.likedBy.push(userId)

        } else if(Post.likedBy.includes(userId)) {

            var index = Post.likedBy.indexOf(userId)
            Post.likedBy.splice(index, 1)

        }

        await Post.save()

        return NextResponse.json({status: 200})

    } catch (error) {
        return NextResponse.json({message: "There's been a problem with liking the post."}, {status: 500})
    }

}