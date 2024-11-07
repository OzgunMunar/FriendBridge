import { ConnectToDB } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import { NextResponse } from "next/server";


export async function PATCH(req) {

    await ConnectToDB()

    try {
        
        const { postId, comment } = await req.json()
        const post = await Posts.findById(postId)
                                .populate('creator', 'username userImageLink')
                                .populate('comments.creator', 'username userImageLink')

        if (!post) {
            return NextResponse.json({ message: "Post not found." }, { status: 404 });
        }

        post.comments.push(comment)
        await post.save()
        
        return new NextResponse(JSON.stringify(post), {status: 200})

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message: "Problem occured while saving the comment."}, {status: 500})
    }

}