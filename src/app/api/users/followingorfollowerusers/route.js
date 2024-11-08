import { ConnectToDB } from "@/dbConfig/dbConfig"
import Users from "@/models/userModel"
import { NextResponse } from "next/server"


export const POST = async(request) => {

    try {
        
        await ConnectToDB()

        const { userId, relationType } = await request.json()
        
        let user, usersArray

        if(relationType === "Following") {

            user = await Users.findOne({ _id: userId })
                                .populate("followingPeople") 
            usersArray = user.followingPeople

        } else if(relationType === "Follower") {

            user = await Users.findOne({ _id: userId })
                                .populate("followedBy") 
            usersArray = user.followedBy

        } else {

            return NextResponse.json("Relation Type is empty", { status: 500 })

        }

        return NextResponse.json({ data: usersArray }, { status: 200 })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json("There's been a problem in fetching following users", { status: 500 })
    }


}