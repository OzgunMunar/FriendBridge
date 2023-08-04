'use client'

import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProfilePage = () => {

    const router = useRouter()
    const [data, setData] = useState('nothing')

    const logout = async () => {

        try {
            
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }

    }

    const getUserDetails = async () => {
    
        const response = await axios.get('/api/users/me')

        const currentUser = {
            username: response.data.data.username,
            email: response.data.data.email,
            isAdmin: response.data.data.isAdmin,

        }

        setData(response.data.data._id)
        // setData(currentUser)

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h5>Profile</h5>
            <hr />
            <p>Profile Page</p>
            <h2>
            {
                data === 'nothing' ? "Nothing" : 
                <Link href={`/profile/${data}`}>
                    Go To Profile
                </Link>
            }
            </h2>
            <button
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded mt-4">LogOut</button>

            <button
            onClick={getUserDetails}
            className="bg-blue-500 hover:bg-blue-700 text-white
            font-bold py-2 px-4 rounded mt-4">get user details</button>

        </div>
    )
}

export default ProfilePage