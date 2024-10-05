"use client";

import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import '@/app/_styles/login.css'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage({changePage}) {
    
    const router = useRouter();
    
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const emailRef = useRef()

    const onLogin = async () => {

        try {

            setLoading(true)
            await axios.post("/api/users/login", user)
            router.push("/")
            
        } catch (error) {
            const response = error.response
            if (response) {
                const status = response.status;
                if (status === 400) {
                    toast.error(response.data.message, { theme: "dark" });
                } else if (status === 404) {
                    toast.info(response.data.message, { theme: "dark" });
                } else {
                    toast.error("An unexpected error occurred. Please try again later.", { theme: "dark" });
                }
            } else {
                toast.error("Network error. Please try again later.", { theme: "dark" });
            }
        } finally{
            setLoading(false)
        }

    }

    useEffect(() => {
        
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }

    }, [user]);

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    return (

        <section className="login_form main_form">

            <p className="main_form_title">Log In</p>
            <p className="main_form_title_two">To connect and get to know others!</p>
            <div className="login_form_horizontal_line_full"></div>

            <input 
                className="login_form_input"
                id="email"
                type="text"
                ref={emailRef}
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email Address"
                autoFocus
            />

            <input 
                className="login_form_input"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />

            <button
                onClick={onLogin}
                className="login_submit_button"
                disabled={buttonDisabled}>
                    {loading ? "Processing..." : "Log In"}
            </button>

            <div className="flex justify-around items-center flex-row w-5/6">

                <div className="login_form_horizontal_line"></div>
                <span className="text-gray-400">or</span>
                <div className="login_form_horizontal_line"></div>

            </div>

            <button type="button" className="login_form_create_account_button mt-4" onClick={() => changePage(val => !val)}>Create an account</button>
            
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
        </section>

    )

}