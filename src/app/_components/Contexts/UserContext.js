import axios from "axios"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState("")
    const [notifications, setNotifications] = useState([])

    const unreadNotificationCountRef = useRef(0)

    useEffect(() => {
        
        const userData = localStorage.getItem("userData")
        
        if(userData) {

            const parsedData = JSON.parse(userData)
            setUser(parsedData)
            unreadNotificationCountRef.current = parsedData.unreadNotificationNumber

        } else {

            const fetchUser = async() => {

                try {
    
                    await axios.get("/api/users/loggedinuser")
                                .then((response) => {

                                    const fetchedUserData = response.data.data
                                    localStorage.setItem("userData", JSON.stringify(fetchedUserData))
                                    setUser(fetchedUserData)
                                    
                                    unreadNotificationCountRef.current = fetchedUserData.unreadNotificationNumber

                                })
                                .catch((error) => {
                                    console.error(error.message)
                                })
    
                } catch (error) {
                    console.log(error.message)
                }
    
            }

            fetchUser()
            
        }

    }, [])

    const updateUser = useCallback((newUserInfo) => {

        localStorage.setItem("userData", JSON.stringify(newUserInfo))
        setUser(newUserInfo)

    }, [])

    const updateUsersFollowingStatus = useCallback((loggedinuser) => {

        setUser((prevUserValue) => {
            return { ...prevUserValue, followingPeople: loggedinuser.followingPeople }
        })
        
    }, [])

    const getNotifications = useCallback((notificationList) => {
        setNotifications(notificationList)
    }, [])

    const attachNotifications = useCallback((newNotifications) => {

        setNotifications((oldNotifications) => [
            ...oldNotifications,
            ...newNotifications
        ])

    }, [])

    const markAsRead = useCallback((notification) => {

        const updatedNotifications = notifications.map((updateNotification) => {

            if (updateNotification._id === notification._id) {

                return { ...updateNotification, isRead: true }

            }

            return updateNotification

        })

        if(JSON.stringify(updatedNotifications) !== JSON.stringify(notifications)) {
            getNotifications(updatedNotifications)
        }

        if(unreadNotificationCountRef.current > 0) {
            unreadNotificationCountRef.current -= 1
        }


        const userData = localStorage.getItem("userData")
        const parsedData = JSON.parse(userData)

        parsedData.unreadNotificationNumber = unreadNotificationCountRef.current
        localStorage.setItem("userData", JSON.stringify(parsedData))

    }, [notifications])

    return (
        <UserContext.Provider value={{ 
            user, 
            setUser, 
            updateUser, 
            updateUsersFollowingStatus,
            notifications,
            getNotifications,
            attachNotifications,
            markAsRead,
            unreadNotificationCountRef
            }}>
            { children }
        </UserContext.Provider>
    )

}

export const useUserContext = () => {
    return useContext(UserContext)
}