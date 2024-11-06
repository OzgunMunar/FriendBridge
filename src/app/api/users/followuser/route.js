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

        if(loggedUser.followingPeople.includes(matcherId))
            return NextResponse.json("Already following that user!", { status: 500 })

        if(!loggedUser.followingPeople.includes(matcherId)) {

            // If user who is requesting to follow is not following the other user.
            if(loggedUser.followingPeople.length === 0) {

                loggedUser.followingPeople = [ matcherId ]

            } else {

                loggedUser.followingPeople.push(matcherId)

            }


        }

        if(!matchedUser.followedBy.includes(userId)) {

            // I need to add matched user's followedBy field
            if(matchedUser.followedBy.length === 0) {

                matchedUser.followedBy = [ userId ]

            } else {

                matchedUser.followedBy.push(userId)

            }

        }

        await Promise.all([ loggedUser.save(), matchedUser.save() ])

        return new NextResponse(JSON.stringify(loggedUser), { status: 200 })

    } catch (error) {
        
        console.log(error.message)
        return NextResponse.json("Check console for the error message", { status: 500 })

    }


}