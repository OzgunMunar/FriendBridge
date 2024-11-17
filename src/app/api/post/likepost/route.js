import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import { NotificationAction } from "@/helpers/notificationActions"
import { NotificationActionTypes } from "@/helpers/notificationActionTypes"
import { NotificationMaker } from "@/helpers/notificationMaker"
import LikedPosts from "@/models/likedPostsModel"
import Posts from "@/models/postModel"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {

        await ConnectToDB()
        
        const { postId } = await req.json()
        
        // Fetch Post
        const Post = await Posts.findById(postId)
                                .populate("creator")
        
        // Fetch User
        const userId = await getDataFromToken(req)
        
        // Fetch LikedPostDocument
        let LikedPostDocument = await LikedPosts.findOne({ userId: userId })

        // Check if there is such Post
        if (!Post) 
            return NextResponse.json({ message: "Post not found" }, { status: 404 })
        
        // If there is Post, check if that post liked by that user previously. If there is not that post, like it.
        if (!Post.likedBy.includes(userId)) { 
            
            Post.likedBy.push(userId)

            // Check liked post document exist
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
            // If there is that post, unlike it.
            const index = Post.likedBy.indexOf(userId)
            Post.likedBy.splice(index, 1)

            if (LikedPostDocument) {

                const indexSecond = LikedPostDocument.likedPosts.indexOf(postId)

                if (indexSecond !== -1) {

                    LikedPostDocument.likedPosts.splice(indexSecond, 1)

                }

            }

        }

        // Execute two statement at once.
        await Promise.all([ 
            Post.save(), 
            LikedPostDocument ? LikedPostDocument.save() : Promise.resolve() 
        ])

        Post.likedBy.includes(userId) && NotificationMaker(userId, Post.creator._id.toString(), NotificationAction.PostLiked, NotificationActionTypes.PostRelated, Post._id)

        return NextResponse.json({ status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
