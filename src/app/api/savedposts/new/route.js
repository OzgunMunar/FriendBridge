import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import SavedPosts from "@/models/savedPostsModel"
import { NextResponse } from "next/server"

export const POST = async(request) => {

    try {

        await ConnectToDB()

        const userId = getDataFromToken(request)
        const { postId } = await request.json()
     
        let savedPostDocument = await SavedPosts.findOne({ userId })
        if(savedPostDocument) {
    
            if(!savedPostDocument.postIds.includes(postId)) {

                savedPostDocument.postIds.push(postId)

            } else {

                const index = savedPostDocument.postIds.indexOf(postId)
                
                if(index !== -1)
                    savedPostDocument.postIds.splice(index, 1)

            }

        } else {
            savedPostDocument = new SavedPosts({
                userId: userId,
                postIds: [ postId ]
            })
        }

        await savedPostDocument.save()
        return NextResponse.json({ status: 200 })

    } catch (error) {
        
        console.log(error.message)
        return NextResponse.json({ message: error.message, status: 500 })

    }

}