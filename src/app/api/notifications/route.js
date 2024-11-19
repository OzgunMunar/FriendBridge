import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import Notifications from "@/models/notificationModel"
import { NextResponse } from "next/server"

export async function GET(request) {

    try {

        await ConnectToDB()

        const userId = getDataFromToken(request)
        const notificationDocument = await Notifications.findOne({ agentUserId: userId })
                                                 .populate("notifications.actorUserId")

        return NextResponse.json({ data: notificationDocument }, { status: 200 })
        
    } catch (error) {
        return NextResponse.json("There has been an error during fetching notifications", { status: 500 })
    }

}