import Notifications from "@/models/notificationModel"

export const NotificationMaker = async(actorUserId, agentUserId, notificationActionMessage, notificationActionType, actionRelatedId) => {

    try {
        // actorUserId is liker and commentor.
        // agentUserId is receiver.

        // fix the issue that repeatedly sending notification everytime actor saves & unsaves repeatedly.

        if(actorUserId === agentUserId)
            return

        let notificationRecordForTheUser = await Notifications.findOne({ agentUserId })
        let notificationObject = {
            actorUserId: actorUserId,
            message: notificationActionMessage,
            actionType: notificationActionType,
            actionRelatedId: actionRelatedId,
            isRead: false
        }

        if(!notificationRecordForTheUser) {

            notificationRecordForTheUser = new Notifications({
                agentUserId: agentUserId,
                notifications: [notificationObject]
            })

        } else {

            notificationRecordForTheUser.notifications = [notificationObject, ...notificationRecordForTheUser.notifications]

        }

        await notificationRecordForTheUser.save()
        
    } catch (error) {
        console.log("There's been an error while making notification.")
        console.error(error.message)
    }

}
