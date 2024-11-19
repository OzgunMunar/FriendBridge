import React, { useEffect, useState } from 'react'
import Notification from './Notification'
import PageLoader from "@/app/pageloader"
import { useUserContext } from '../Contexts/UserContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import '@/app/_styles/notifications.css'

const Notifications = () => {

    const {user, notifications, getNotifications, attachNotifications} = useUserContext()
    const [render, setRender] = useState(false)
    const [loadData, setLoadData] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(true)
    const [renderLoadDataButton, setRenderLoadDataButton] = useState(false)

    const [pagination, setPagination] = useState({

        page: 1,
        limit: 10,
        totalNotifications: 0,
        totalPages: 0
        
    })

    useEffect(() => {

        if(pagination.page === 1) {
            setRender(false)
        }

        const fetchData = async() => {

            try {
                
                await axios.post("/api/notifications/paginated", { pagination })
                        .then((response) => {

                            const notificationResponse = response.data.notificationDocument.notifications

                            setPagination({
                                page: response.data.pagination.page,
                                limit: response.data.pagination.limit,
                                totalNotifications: response.data.pagination.totalNotifications,
                                totalPages: response.data.pagination.totalPages,
                            })

                            if(pagination.page === 1) {
                                getNotifications(notificationResponse)
                            } else {
                                attachNotifications(notificationResponse)
                            }

                        })
                        .catch((error) => {
                            toast.error(error.message)
                        })

            } catch (error) {
                toast.error("There's been an error while fetching notifications", { theme: "dark" })
            } finally {

                setButtonLoading(false)

                if (pagination.page === pagination.totalPages) {
                    setRenderLoadDataButton(false)
                } else {
                    setRenderLoadDataButton(true)
                }

                setRender(true)

            }

        }

        fetchData()

    }, [user, loadData])

    const LoadMore = () => {

        setButtonLoading(val => !val)

        setPagination((prev) => ({
            ...prev,
            page: prev.page + 1
        }))
        
        setLoadData(val => !val)
    }

    return (

        <div className='notifications_body_sections'>

            <div className='notifications_section'>

                <div className='relative w-full border-t border-t-2 border-t-orange-700 bg-white flex items-center justify-center gap-2 text-xl py-2'>

                    <img width="20" height="20" src="https://img.icons8.com/color/48/alarm.png" alt="notifications_icon"/>
                    <span>Notifications</span>

                </div>

                <div className='notifications_container'>

                    {

                        render ? (
                            
                            notifications.map((notification) => {

                                return (

                                    <div key={notification._id}>

                                        <Notification notification={notification} />

                                    </div>

                                )
                            })

                        ) 
                        : <PageLoader />

                    }
                    {

                        renderLoadDataButton === true ? (

                           <div className="loadmore_button_container">

                           <button className="loadmore_button" 
                                onClick={() => {
    
                                LoadMore()
    
                              }}>{buttonLoading ? "Loading..." : "Load More"}</button>
    
                           </div>

                        ) : null

                     }

                </div>

            </div>

        </div>

    )

}

export default Notifications