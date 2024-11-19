import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Tooltip } from 'react-tooltip'
import { useUserContext } from '../Contexts/UserContext'

const Notification = ({ notification }) => {

    const { markAsRead } = useUserContext()

    const MarkAsReadNotification = () => {

        const notificationId = notification._id
        const markNotificationSeen = async() => {

            await axios.patch("/api/notifications/readnotification", { notificationId })
            markAsRead(notification)

        }
        markNotificationSeen()
    }

    return (

        <div onMouseEnter={() => { !notification.isRead && MarkAsReadNotification()}} className={`notification_container ${notification.isRead ? "bg-neutral-50 hover:bg-neutral-100":"bg-yellow-100 hover:bg-yellow-200 text-yellow-700"}`}>

            <div className='notification_left_info'>

                <Link href={`/profile/${notification.actorUserId.userCodeName}`}>
                    <img src={notification.actorUserId.userImageLink} className="rounded-md w-[50px] h-[50px] object-cover"/>
                </Link>

                <Link href={`/profile/${notification.actorUserId.userCodeName}`} className="font-medium transition-all duration-200 ease-in hover:text-blue-600 hover:underline">
                    {notification.actorUserId.username},
                </Link>

                <div>{notification.message}</div>

            </div>

            <div className='notification_right_info relative'>

                <Link className="flex items-center justify-center" href={`${notification.actionType === "post-related" ? `/post/${notification.actionRelatedId}`:`/profile/${notification.actorUserId.userCodeName}`}`}>
                    <div className='flex gap-1 ml-6 whitespace-nowrap text-sm font-semibold text-sky-500 hover:text-sky-600 transition-all duration-200 ease-in'>Details<span>→</span></div>
                </Link>

            </div>

        </div>

    )

}

export default Notification