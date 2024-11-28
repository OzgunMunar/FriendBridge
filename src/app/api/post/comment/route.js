import { ConnectToDB } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/helper";
import { NotificationAction } from "@/helpers/notificationActions";
import { NotificationActionTypes } from "@/helpers/notificationActionTypes";
import { NotificationMaker } from "@/helpers/notificationMaker";
import Posts from "@/models/postModel";
import { NextResponse } from "next/server";
import "@/models/groupsModel"
import "@/models/eventModel"

export async function PATCH(req) {

    await ConnectToDB()

    try {
        
        const { postId, comment } = await req.json()
        const userId = await getDataFromToken(req)

        const post = await Posts.findById(postId)
                                .populate("relatedGroup")
                                .populate("relatedEvent")
                                .populate("creator", "username userImageLink userCodeName")
                                .populate("comments.creator", "username userImageLink userCodeName")

        if (!post) {
            return NextResponse.json({ message: "Post not found." }, { status: 404 });
        }

        post.comments.push(comment)
        await post.save()

        NotificationMaker(userId, post.creator._id.toString(), NotificationAction.PostCommented, NotificationActionTypes.PostRelated, postId)
        
        return new NextResponse(JSON.stringify(post), {status: 200})

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({message: "Problem occured while saving the comment."}, {status: 500})
    }

}