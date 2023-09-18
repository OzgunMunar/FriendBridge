"use client";

import React, {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import '@/app/_styles/login.css'

export default function LoginPage({changePage}) {
    
    const router = useRouter();
    
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const emailRef = useRef()

    const onLogin = async () => {

        try {

            setLoading(true)
            await axios.post("/api/users/login", user)
            toast.success("Login success")
            router.push("/")

        } catch (error) {
            toast.error(error.response.data.message)
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

        <section className="login_form">

            <input 
                className="login_form_input"
                id="email"
                type="text"
                ref={emailRef}
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email Address"
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

            <div className="login_form_horizontal_line"></div>

            <button type="button" className="login_form_create_account_button" onClick={() => changePage(val => !val)}>Create an account</button>
            <Toaster position="top-center" reverseOrder={false}/>

        </section>

    )

}