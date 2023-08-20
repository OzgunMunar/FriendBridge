"use client";

import React, { useEffect, useRef } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

export default function SignupPage({changePage}) {
    
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        passwordRepeat: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const usernameRef = useRef()
    
    const onSignup = async () => {

        try {

            setLoading(true);

            if(user.password !== user.passwordRepeat)
            {
                toast.error("Passwords doesn't match")
                return
            }
            
            await axios.post("/api/users/signup", user);
            router.push("/login");
            
        } catch (error) {
            toast.error(error.response.data.message)
        }finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    useEffect(() => {

        usernameRef.current.focus()

    }, [])

    return (

        <div className="login_form">

            <input 
            className="login_form_input"
                id="username"
                type="text"
                ref={usernameRef}
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                />

            <input 
            className="login_form_input"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
                />

            <input 
            className="login_form_input"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                />

            <input 
            className="login_form_input"
                id="password"
                type="password"
                value={user.passwordRepeat}
                onChange={(e) => setUser({...user, passwordRepeat: e.target.value})}
                placeholder="password repeat"
                />

            <button
                onClick={onSignup}
                className="login_form_create_account_button" disabled={buttonDisabled}>{loading ? "Processing..." : "Sign Up"}</button>

            <button type="button" className="sign_up_tologinpage" onClick={()=> changePage(val => !val)}>
                <img width="30" height="30" src="https://img.icons8.com/color/48/sort-left.png" alt="sort-left"/>
                <span>To Login page</span>
            </button>

            <Toaster position="top-right" reverseOrder={false}/>

        </div>

    )

}