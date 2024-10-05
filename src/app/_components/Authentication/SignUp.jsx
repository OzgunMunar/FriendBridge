"use client";

import React, { useEffect, useRef } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage({changePage}) {
    
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        username: "",
        password: "",
        passwordRepeat: "",
        userImageLink: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const usernameRef = useRef();
    
    const onSignup = async () => {

        try {

            setLoading(true);

            if(user.password !== user.passwordRepeat)
            {
                toast.error("Passwords doesn't match", { theme: "dark" })
                return
            }
            
            await axios.post("/api/users/signup", user);
            setTimeout(() => window.location.reload(), 3000)
            toast.success("User successfully created. Please verify your account.", { theme: "light" })
            
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
        }

    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.passwordRepeat.length > 0 && user.username.length > 0 && user.userImageLink.length > 0) {
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
                placeholder="User Name"
                required
                />

            <input 
            className="login_form_input"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="E-mail"
                required
                />

            <input 
            className="login_form_input"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
                required
                />

            <input 
            className="login_form_input"
                id="password"
                type="password"
                value={user.passwordRepeat}
                onChange={(e) => setUser({...user, passwordRepeat: e.target.value})}
                placeholder="Password Repeat"
                required
                />

            <input 
            className="login_form_input"
                id="imagelink"
                type="text"
                value={user.userImageLink}
                onChange={(e) => setUser({...user, userImageLink: e.target.value})}
                placeholder="Enter User Image Link"
                />

            <button
                type="button"
                onClick={onSignup}
                className="login_form_create_account_button" disabled={buttonDisabled}>{loading ? "Processing..." : "Sign Up"}
            </button>

            <div className="login_form_horizontal_line mt-3"></div>

            <button type="button" className="sign_up_tologinpage" onClick={()=> changePage(val => !val)}>
                <span>Log In</span>
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

    )

}


// import React from 'react';
// import { useForm } from 'react-hook-form';

// export default function App() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
//   console.log(errors);
  
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" placeholder="User Name" {...register("User Name", {required: true, maxLength: 80})} />
//       <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
//       <input type="password" placeholder="Password" {...register("Password", {required: true, maxLength: 12})} />
//       <input type="password" placeholder="Password Repeat" {...register("Password Repeat", {required: true, maxLength: 12})} />
//       <input type="text" placeholder="User Image Link" {...register("User Image Link", {required: true, maxLength: 100})} />

//       <input type="submit" />
//     </form>
//   );
// }