import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState('')

    useEffect(() => {

        const fetchUser = async() => {

            try {

                const loggedinuser = await axios.get('/api/users/loggedinuser')
                setUser(loggedinuser.data.data)   

            } catch (error) {
                console.log(error.message)
            }

        }

        fetchUser()

    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )

}

export const useUserContext = () => {
    return useContext(UserContext)
}