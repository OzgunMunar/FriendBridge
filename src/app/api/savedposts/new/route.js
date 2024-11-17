import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import { NotificationAction } from "@/helpers/notificationActions"
import { NotificationActionTypes } from "@/helpers/notificationActionTypes"
import { NotificationMaker } from "@/helpers/notificationMaker"
import SavedPosts from "@/models/savedPostsModel"
import { NextResponse } from "next/server"

export const POST = async(request) => {

    try {

        await ConnectToDB()

        const userId = getDataFromToken(request)
        const { postId, postCreatorId } = await request.json()
     
        // Fetch the savedpost document of the user.
        let savedPostDocument = await SavedPosts.findOne({ userId })

        // if User saved any post before, there must be a document for that. Check conditions if there is one or not.
        if(savedPostDocument) {
            //if User did not save that post so far, save it.
            if(!savedPostDocument.postIds.includes(postId)) {

                savedPostDocument.postIds.push(postId)

            } else {
                //if User saved that post already, unsave it.
                const index = savedPostDocument.postIds.indexOf(postId)

                if(index !== -1)
                    savedPostDocument.postIds.splice(index, 1)

            }

        } else {
            //if User's first time saving a post.
            savedPostDocument = new SavedPosts({
                userId: userId,
                postIds: [ postId ]
            })

        }

        await savedPostDocument.save()

        savedPostDocument.postIds.includes(postId) && NotificationMaker(userId, postCreatorId, NotificationAction.PostSaved, NotificationActionTypes.PostRelated, postId)

        return NextResponse.json({ status: 200 })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, status: 500 })
    }

}