"use client";

import SignupPage from "@/app/_components/SignUp";
import LoginPage from "../_components/Login";
import React from 'react'

export default function Login() {
    
    const [isSignUp, setIsSignUp] = React.useState(false);
    
    return (
        
        <div className="login_container">
            
            <section className='login_text'>

                <p className="login_header_app_name">Social App</p>
                <p className="login_header_app_explanation">A chance to meet anyone across the world, share what you think and get to know people who are sharing same interests with you!</p>

            </section>

            {isSignUp ? (<SignupPage changePage={setIsSignUp}/>)
            :
            (<LoginPage changePage={setIsSignUp}/>)}

        </div>
            
    )

}