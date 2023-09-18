'use client'

import React, { useState, useEffect, useRef, useContext } from "react";
import '@/app/_styles/navbar.css'

import { Toaster, toast } from "react-hot-toast";
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../Contexts/Contexts";
import Tooltip from "../Tooltip/Tooltip";

const Navbar = () => {

    const router = useRouter()
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const {user} = useContext(UserContext)

    function headerMainDropdown() {
        setIsDropdown(status=> !status)
    }

    useEffect(() => {

      const handleOutsideClick = (event) => {

        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdown(false);
        }

      };

      document.addEventListener('click', handleOutsideClick);

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };

    }, []);

    const LogOut = async() => {

        try {
            
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }

    }

    return (

      <div className="navbar" id="headerNavbar">

            <Link href="/">
                <span id="logo">
                    Social App
                </span> 
            </Link>

            <div className="tabs">
                
                <Tooltip text='Feed'>
                    <Link href="/" className="headerTab">
                        <img width="23" height="23" src="https://img.icons8.com/color/48/rss.png" alt="rss"/>
                    </Link>
                </Tooltip>

                <Tooltip text='Notifications'>
                    <Link href="/notifications" className="headerTab">
                        <img width="23" height="23" src="https://img.icons8.com/color/48/alarm.png" alt="alarm"/>
                    </Link>
                </Tooltip>

                <Tooltip text='Messages'>
                    <Link href="/messages" className="headerTab">
                        <img width="23" height="23" src="https://img.icons8.com/color/48/paper-plane.png" alt="paper-plane"/>
                    </Link>
                </Tooltip>

                <div ref={dropdownRef} className="dropdown">

                    <button className="dropbtn" onClick={() => headerMainDropdown()}>
                        <img width="23" height="23" src="https://img.icons8.com/color/48/expand-arrow--v1.png" alt="expand-arrow--v1"/>
                    </button>

                </div>

                {isDropdown && (

                <div className="dropdown-content" id="mainDropdown">
                    
                    <Link href="/profile">
                        
                        <div className="grid-container-dropdown">

                            <div className="grid-item-dropdown-1">
                                <img src={user.userImageLink} alt="Picture of the post owner" loading="lazy" className="nav_bar_photo" />
                            </div>

                            <div className="grid-item-dropdown-2">
                                <span className="firstLineText">{user.username}</span>
                                <br />
                                <span className="secondLineText">See your profile</span>
                            </div>

                        </div>

                    </Link>
                    
                    <hr />
                    
                    <Link href="/givefeedback">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <img width="30" height="30" src="https://img.icons8.com/color/48/popular-topic.png" alt="popular-topic"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Give Feedback</span>
                            </div>
                        </div>
                    </Link>
                    
                    <hr />
                    
                    <Link href="/settings">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <img width="30" height="30" src="https://img.icons8.com/color/48/gear.png" alt="gear"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Settings</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="/helpandsupport">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <img width="30" height="30" src="https://img.icons8.com/color/48/help--v1.png" alt="help--v1"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Help & Support</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="/display">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <img width="30" height="30" src="https://img.icons8.com/color/48/roller-brush--v1.png" alt="roller-brush--v1"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Display</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="#" onClick={() => LogOut()}>
                        <div className="grid-container-dropdown">

                            <div className="grid-item-dropdown-normal-first">
                                <img width="30" height="30" src="https://img.icons8.com/color/48/logout-rounded--v1.png" alt="logout-rounded--v1"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Log Out</span>
                            </div>
                            
                        </div>
                    </Link>

                </div>

                
                )}

            </div>

            <Toaster position="top-center" reverseOrder={false}/>
        
      </div>

    )
}

export default Navbar