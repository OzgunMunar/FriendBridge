'use client'

import React, { useState, useEffect } from "react"
import { Toaster, toast } from "react-hot-toast"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

const ChangePassword = () => {

    const [user, setUser] = useState({
        username: "",
        oldpassword: "",
        newpassword: "",
        repeatnewpassword: "",
        email: "",
        token: ""
    })

    const router = useRouter()

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState()
    const [inputBackground, setInputBackground] = useState('white')

    useEffect(()=> {

        if(user.username.length > 0 && user.oldpassword.length > 0 && user.email.length > 0 
            && user.newpassword.length > 0 && user.repeatnewpassword.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }

    }, [user])

    const onPasswordChange = async() => {

        try {

            if(user.newpassword !== user.repeatnewpassword)
            {
                toast.error("Passwords should match.")
                setInputBackground('pink')
                return
            }
            
            setLoading(true)

            await axios.post("/api/users/changepassword", user)
            await axios.get('/api/users/logout')
            
            toast.success('Password change successful')
            router.push('/login')

        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        const urlToken = window.location.search.split('=')[1]
        setUser(data => {
            return {
                ...data,
                token: urlToken || ""
            }
        })
        
    }, [])

    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1>{loading ? "Processing" : "Change Password"}</h1>
            <hr />

            <label htmlFor="username">Username</label>
            <input 
            className="p-2 border border-gray-30 mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
            />

            <label htmlFor="email">Email</label>
            <input 
            className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
            />

            <label htmlFor="oldpassword">Current password</label>
            <input 
            className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="oldpassword"
                type="password"
                value={user.oldpassword}
                onChange={(e) => setUser({...user, oldpassword: e.target.value})}
                placeholder="Current password"
            />

            <label htmlFor="newpassword">New password</label>
            <input 
            className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="newpassword"
                type="password"
                value={user.newpassword}
                style={{'backgroundColor': inputBackground}}
                onChange={(e) => setUser({...user, newpassword: e.target.value})}
                placeholder="New password"
            />

            <label htmlFor="repeatnewpassword">Repeat new password</label>
            <input 
            className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="repeatnewpassword"
                type="password"
                value={user.repeatnewpassword}
                style={{'backgroundColor': inputBackground}}
                onChange={(e) => setUser({...user, repeatnewpassword: e.target.value})}
                placeholder="Repeat new password"
            />      

            <button
                onClick={onPasswordChange}
                className="p-2 border border-gray-300 mb-4 focus:outline-none focus:border-gray-600"
                disabled={buttonDisabled}>
                    {buttonDisabled ? "Provide Values" : "Change Password"}</button>
            <Link href="/">Cancel to Home Page</Link>

            <Toaster position="top-right" reverseOrder={false}/>

        </div>
        
    )
}

export default ChangePassword