"use client";

import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import '@/app/_styles/login.css'

export default function LoginPage() {
    
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {

        try {

            setLoading(true);
            const response = await axios.post("/api/users/login", user)
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

    return (
    <div className="login_container">
        <section className='login_text'>

            <p className="login_header_app_name">Social App</p>
            <p className="login_header_app_explanation">A chance to meet anyone across the world, share what you think and get to know people who are sharing same interests with you!</p>

        </section>

        <section className="login_form">
        
            <input 
                className="login_form_input"
                id="email"
                type="text"
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
                className="login_submit_button">
                    {loading ? "Processing" : "Log In"}
            </button>

            <div className="login_form_horizontal_line"></div>

                <Link href="/signup" className="login_form_create_account_button">Create an account</Link>

                <Toaster position="top-right" reverseOrder={false}/>

        </section>

    </div>
    )

}