import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import Users from "@/models/userModel"
import { NextResponse } from "next/server"


export const POST = async(request) => {

    try {
        
        await ConnectToDB()

        const { userId } = await request.json()
        const user = await Users.findOne({ _id: userId })
                                 .populate("followingPeople")

        const followingUsersArray = user.followingPeople

        return NextResponse.json({ data: followingUsersArray }, { status: 200 })

    } catch (error) {
        console.log(error.message)
        return NextResponse.json("There's been a problem in fetching following users", { status: 500 })
    }


}