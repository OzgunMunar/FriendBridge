import { ConnectToDB } from "@/dbConfig/dbConfig"
import { NotificationAction } from "@/helpers/notificationActions"
import { NotificationActionTypes } from "@/helpers/notificationActionTypes"
import { NotificationMaker } from "@/helpers/notificationMaker"
import Users from "@/models/userModel"
import { NextResponse } from "next/server"

export const POST = async(request) => {

    try {
        
        await ConnectToDB()

        // Get data from client-side
        const { userId, matcherCodeName } = await request.json()

        // Fetch data from loggedUser and targetUser
        const loggedUser = await Users.findById(userId)
        const matchedUser = await Users.findOne({ userCodeName: matcherCodeName })
        const matcherId = matchedUser._id

        // Check if loggedUser data exist
        if(!loggedUser)
            return NextResponse.json("Logged User couldn't found.", { status: 500 })

        // Check if targerUser data exist
        if(!matchedUser)
            return NextResponse.json("User couldn't found", { status: 500 })

        // Check if loggedUser already follows targetUser
        if(loggedUser.followingPeople.includes(matcherId))
            return NextResponse.json("Already following that user!", { status: 500 })

        // Check if loggedUser doesn't follow targetUser
        if(!loggedUser.followingPeople.includes(matcherId)) {

            // If loggedUser does not follow any user
            if(loggedUser.followingPeople.length === 0) {

                loggedUser.followingPeople = [ matcherId ]

            } else {
                // If loggedUser already follows any other user(s)
                loggedUser.followingPeople.push(matcherId)

            }


        }

        // If targetUser does not follow loggeedUser
        if(!matchedUser.followedBy.includes(userId)) {

            // I need to add matched user's followedBy field
            if(matchedUser.followedBy.length === 0) {

                matchedUser.followedBy = [ userId ]

            } else {

                matchedUser.followedBy.push(userId)

            }

        }

        await Promise.all([ loggedUser.save(), matchedUser.save() ])

        NotificationMaker(userId, matcherId, NotificationAction.UserRelation, NotificationActionTypes.UserRelated, matcherId)

        return new NextResponse(JSON.stringify(loggedUser), { status: 200 })

    } catch (error) {
        
        console.log(error.message)
        return NextResponse.json("Check console for the error message", { status: 500 })

    }


}