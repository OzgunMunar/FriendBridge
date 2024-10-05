"use client";

import React, { useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage({changePage}) {

    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        gender: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const usernameRef = useRef();

    const emailPatternRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordPatternRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

    const onSignup = async () => {

        try {

            setLoading(true);
            
            if(!emailPatternRegex.test(user.email)) {
                toast.info("Email is invalid: \nFormat is format@email.com!", { theme: "light" })
                return
            }

            if(!passwordPatternRegex.test(user.password)) {
                toast.info("Password is invalid: Minimum eight characters, at least one letter and one number!", { theme: "light" })
                return
            }

            if(user.password !== user.passwordRepeat) {
                toast.info("Passwords does not match!", { theme: "dark" })
                return
            }

            if(user.gender === null || user.gender === "") {
                toast.info("Gender field is invalid: Please select one.", { theme: "light " })
                return
            }
            
            await axios.post("/api/users/signup", user);
            setTimeout(() => window.location.reload(), 4000)
            toast.success("User successfully created. Please verify your account via your email address.", { theme: "light" })
            
        } catch (error) {
            const response = error.response
            if (response) {
                const status = response.status;
                if (status === 400) {
                    toast.info(response.data.message, { theme: "dark" });
                } else if (status === 401) {
                    toast.info(response.data.message, { theme: "dark" });
                } else {
                    toast.error("An unexpected error occurred. Please try again later.", { theme: "dark" });
                }
            } else {
                toast.error("Network error. Please try again later.", { theme: "dark" });
            }
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.passwordRepeat.length > 0 && user.username.length > 0 && user.gender.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    return (

        <div className="signup_form main_form">

            <p className="main_form_title">Sign Up</p>
            <p className="main_form_title_two">It is quick, easy and well-formulated to join others!</p>
            <div className="login_form_horizontal_line_full"></div>

            <input 
                className="login_form_input"
                type="text"
                ref={usernameRef}
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="User Name"
                required
                />

            <input 
                className="login_form_input"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="E-mail"
                required
                />

            <input 
                className="login_form_input"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
                required
                />

            <input 
                className="login_form_input"
                type="password"
                value={user.passwordRepeat}
                onChange={(e) => setUser({...user, passwordRepeat: e.target.value})}
                placeholder="Password Repeat"
                required
                />

            <select 
                className="login_form_input h-10" 
                value={user.gender} onChange={(e) => setUser({...user, gender: e.target.value})}
                required>
                <option disabled value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <button
                type="button"
                onClick={onSignup}
                className="login_form_create_account_button" disabled={buttonDisabled}>{loading ? "Processing..." : "Sign Up"}
            </button>

            <div className="flex justify-around items-center flex-row w-5/6">

                <div className="login_form_horizontal_line"></div>
                <span className="text-gray-400">or</span>
                <div className="login_form_horizontal_line"></div>

            </div>

            <div className="sign_up_tologinpage" onClick={()=> changePage(val => !val)}>
                <span>Already have an account?</span>
            </div>
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

    )

}