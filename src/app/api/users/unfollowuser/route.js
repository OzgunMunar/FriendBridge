import { ConnectToDB } from "@/dbConfig/dbConfig"
import Users from "@/models/userModel"
import { NextResponse } from "next/server"

export const POST = async(request) => {

    try {
        
        await ConnectToDB()

        const { userId, matcherCodeName } = await request.json()

        // request owner user and match user
        const loggedUser = await Users.findById(userId)
        const matchedUser = await Users.findOne({ userCodeName: matcherCodeName })
        const matcherId = matchedUser._id

        if(!loggedUser)
            return NextResponse.json("Logged User couldn't found.", { status: 500 })

        if(!matchedUser)
            return NextResponse.json("User couldn't found", { status: 500 })

        if(!loggedUser.followingPeople.includes(matcherId))
            return NextResponse.json("Already not following that user!", { status: 500 })

        if(loggedUser.followingPeople.includes(matcherId)) {

            const index = loggedUser.followingPeople.indexOf(matcherId)
            loggedUser.followingPeople.splice(index, 1)

        }

        if(matchedUser.followedBy.includes(userId)) {

            const index = matchedUser.followedBy.indexOf(userId)
            matchedUser.followedBy.splice(index, 1)

        }

        await Promise.all([ loggedUser.save(), matchedUser.save() ])

        return new NextResponse(JSON.stringify(loggedUser), { status: 200 })

    } catch (error) {
        
        console.log(error.message)
        return NextResponse.json("Check console for the error message", { status: 500 })

    }


}