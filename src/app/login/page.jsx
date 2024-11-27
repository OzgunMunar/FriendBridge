"use client";

import SignupPage from "@/app/_components/Authentication/SignUp";
import LoginPage from "../_components/Authentication/Login";
import React from 'react'
import imagepa from '@/app/_images/rustic_flower.png';

export default function Login() {
    
    const [isSignUp, setIsSignUp] = React.useState(false)

    return (
        
        <div className="login_container">

            <img src={imagepa.src} alt="flower_image" className="absolute left-0 bottom-0 opacity-10"/>

            <section className='login_text'>

                <p className="login_header_app_name">Friend Bridge</p>
                <p className="login_header_app_explanation">A chance to meet people from around the world, share your thoughts, and connect with others who share your interests!</p>

            </section>

            {isSignUp ? (<SignupPage changePage={setIsSignUp}/>)
            :
            (<LoginPage changePage={setIsSignUp}/>)}
            
        </div>
            
    )

}