import { ConnectToDB } from "@/dbConfig/dbConfig"
import Posts from "@/models/postModel"
import { NextResponse } from "next/server"


export const DELETE = async(req, {params}) => {

    try {
        
        ConnectToDB()

        const {id} = params
        
        await Posts.findByIdAndDelete(id)

        return NextResponse.json({success: "Post deleted."}, {status: 200})
            
    } catch (error) {
        return NextResponse.json({error: "An error occured!"}, {status: 500})
    }

}