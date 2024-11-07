'use client'

import React, { useState, useEffect } from "react"
import '@/app/_styles/changepassword.css'
import '@/app/_styles/login.css'
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {

    const [newUserInfo, setNewUserInfo] = useState({
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

        if(newUserInfo.oldpassword.length > 0 && newUserInfo.email.length > 0 
            && newUserInfo.newpassword.length > 0 && newUserInfo.repeatnewpassword.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }

    }, [newUserInfo])

    const onPasswordChange = async() => {

        try {

            if(newUserInfo.newpassword !== newUserInfo.repeatnewpassword)
            {
                toast.error("Passwords should match.", { theme: "dark" })
                setInputBackground('pink')
                return
            }
            
            setLoading(true)

            await axios.post("/api/users/changepassword", newUserInfo)
            await axios.get('/api/users/logout')
            
            toast.success('Password change successful', { theme: "light" })
            router.push('/login')

        } catch (error) {
            toast.error(error.response.data.message, { theme: "dark" })
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        const urlToken = window.location.search.split('=')[1]
        setNewUserInfo(data => {
            return {
                ...data,
                token: urlToken || ""
            }
        })
        
    }, [])

    return (
        <section className="changepassword_section_container">

            <div className="changepassword_form">

                <p className="main_form_title">Change Password</p>
                <p className="main_form_title_two">change your password to secure your account!</p>
                <div className="form_horizontal_line_full"></div>

                <input 
                    className="form_input"
                    id="email"
                    type="text"
                    value={newUserInfo.email}
                    onChange={(e) => setNewUserInfo({...newUserInfo, email: e.target.value})}
                    placeholder="Email Address"
                    autoFocus
                />

                <input 
                    className="form_input"
                    id="oldpassword"
                    type="password"
                    value={newUserInfo.oldpassword}
                    onChange={(e) => setNewUserInfo({...newUserInfo, oldpassword: e.target.value})}
                    placeholder="Current Password"
                />

                <input 
                    className="form_input"
                    id="newpassword"
                    type="password"
                    value={newUserInfo.newpassword}
                    onChange={(e) => setNewUserInfo({...newUserInfo, newpassword: e.target.value})}
                    placeholder="New Password"
                />

                <input 
                    className="form_input"
                    id="repeatpassword"
                    type="password"
                    value={newUserInfo.repeatnewpassword}
                    style={{ background: inputBackground }}
                    onChange={(e) => setNewUserInfo({...newUserInfo, repeatnewpassword: e.target.value})}
                    placeholder="Repeat New Password"
                />

                <button
                    onClick={onPasswordChange}
                    className="form_change_password_button"
                    disabled={buttonDisabled}>
                        {loading ? "Processing..." : "Change Password"}
                </button>
            
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />

            </div>

        </section>
    )
    
}

export default ChangePassword