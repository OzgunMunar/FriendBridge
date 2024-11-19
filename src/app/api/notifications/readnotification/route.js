import { getDataFromToken } from "@/helpers/helper";
import Notifications from "@/models/notificationModel";
import { NextResponse } from "next/server";

export async function PATCH(request) {

    try {
        
        const userId = getDataFromToken(request)
        const { notificationId } = await request.json()        
        let userNotificationDocument = await Notifications.findOne({ agentUserId: userId })

        userNotificationDocument.notifications.map((notification) => {
            
            if(notification._id.toString() === notificationId.toString()) {
                notification.isRead = true
            }

        })

        await userNotificationDocument.save()
        return NextResponse.json({ status: 200 })

    } catch (error) {
        return NextResponse.json({error: "There's been error while setting notification status."} , {status: 500})
    }

}
