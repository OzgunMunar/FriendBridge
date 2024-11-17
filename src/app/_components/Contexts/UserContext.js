import axios from "axios"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState("")

    useEffect(() => {

        const fetchUser = async() => {

            try {

                await axios.get('/api/users/loggedinuser')
                            .then((response) => {
                                setUser(response.data.data)
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })

            } catch (error) {
                console.log(error.message)
            }

        }

        fetchUser()

    }, [])

    const updateUser = useCallback((newUserInfo) => {
        setUser(newUserInfo)
    }, [])

    const updateUsersFollowingStatus = useCallback((loggedinuser) => {

        setUser((prevUserValue) => {
            return { ...prevUserValue, followingPeople: loggedinuser.followingPeople }
        })
        
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, updateUser, updateUsersFollowingStatus }}>
            { children }
        </UserContext.Provider>
    )

}

export const useUserContext = () => {
    return useContext(UserContext)
}