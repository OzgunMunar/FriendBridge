import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import LikedPosts from "@/models/likedPostsModel"
import Posts from "@/models/postModel"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {

        await ConnectToDB()
        
        const { postId } = await req.json();
        const Post = await Posts.findById(postId);
        const userId = await getDataFromToken(req);
        let LikedPostDocument = await LikedPosts.findOne({ userId: userId })

        if (!Post) 
            return NextResponse.json({ message: "Post not found" }, { status: 404 })
        
        if (!Post.likedBy.includes(userId)) { 
            
            Post.likedBy.push(userId)

            if (LikedPostDocument) {
                
                if (!LikedPostDocument.likedPosts.includes(postId)) {
                    LikedPostDocument.likedPosts.push(postId)
                }

            } else { 
                
                LikedPostDocument = new LikedPosts({
                    userId: userId,
                    likedPosts: [postId]
                })
            }

        } else { 
            
            const index = Post.likedBy.indexOf(userId)
            Post.likedBy.splice(index, 1)

            if (LikedPostDocument) {

                const indexSecond = LikedPostDocument.likedPosts.indexOf(postId)

                if (indexSecond !== -1) {

                    LikedPostDocument.likedPosts.splice(indexSecond, 1)

                }

            }

        }

        await Promise.all([ 
            Post.save(), 
            LikedPostDocument ? LikedPostDocument.save() : Promise.resolve() 
        ]);

        return NextResponse.json({ status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
