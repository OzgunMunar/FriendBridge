import { ConnectToDB } from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/helper"
import Notifications from "@/models/notificationModel"
import { NextResponse } from "next/server"

export async function POST(request) {

    try {

        await ConnectToDB()

        const userId = getDataFromToken(request)
        const { pagination } = await request.json()

        let page = parseInt(pagination.page, 10)
        let limit = parseInt(pagination.limit, 10)
        let totalNotifications = parseInt(pagination.totalNotifications, 10)
        let totalPages = parseInt(pagination.totalPages, 10)

        const notificationDocument = await Notifications.findOne({ agentUserId: userId })
                                                 .populate("notifications.actorUserId")

        totalNotifications = notificationDocument.notifications.length
        totalPages = Math.ceil(totalNotifications / 10)

        notificationDocument.notifications = notificationDocument.notifications.slice((page - 1) * limit, page * limit)

        return NextResponse.json({ 
            notificationDocument,
            pagination: {
                page: page,
                limit: limit,
                totalNotifications: totalNotifications,
                totalPages: totalPages
            }
        }, { status: 200 })
        
    } catch (error) {
        return NextResponse.json("There has been an error during fetching notifications", { status: 500 })
    }

}