'use client'

import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";
import { useUserContext } from "../Contexts/UserContext";
import '@/app/_styles/navbar.css'
import '@/app/_styles/skeletonloader.css'

const Navbar = () => {

    const router = useRouter()
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef(null)
    const { user } = useUserContext()

    function headerMainDropdown() {
        setIsDropdown(status=> !status)
    }

    useEffect(() => {

      const handleOutsideClick = (event) => {

        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsDropdown(false);
        }

      }

      document.addEventListener('click', handleOutsideClick)

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      }

    }, [])

    const LogOut = async() => {

        try {
            
            await axios.get('/api/users/logout')
            router.push('/login')

        } catch (error) {
            toast.error(error.message, { theme: "dark" })
        }

    }

    return (

      <div className="navbar">

            <Link href="/">
                <span id="logo">
                    Friend Bridge
                </span> 
            </Link>

            <div className="tabs">
                
                <Link href="/" className="headerTab" id='navbar_feed_tab'>
                    <img loading="lazy" width="23" height="23" src="https://img.icons8.com/color/48/rss.png" alt="rss"/>
                </Link>
                <Tooltip 
                    anchorSelect='#navbar_feed_tab' 
                    content='Feed' 
                    place='bottom' 
                    offset={0}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />

                <Link href="/" className="headerTab" id='navbar_notification_tab'>
                    <img loading="lazy" width="23" height="23" src="https://img.icons8.com/color/48/alarm.png" alt="alarm"/>
                </Link>
                <Tooltip 
                    anchorSelect='#navbar_notification_tab' 
                    content='Notifications'
                    place='bottom' 
                    offset={0}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />

                <Link href="/" className="headerTab" id='navbar_messages_tab'>
                    <img loading="lazy" width="23" height="23" src="https://img.icons8.com/color/48/paper-plane.png" alt="paper-plane"/>
                </Link>
                <Tooltip 
                    anchorSelect='#navbar_messages_tab' 
                    content='Messages'
                    place='bottom' 
                    offset={0}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />

                <div ref={dropdownRef} className="dropdown">

                    <button className="dropbtn" onClick={() => headerMainDropdown()}>
                        
                        <img loading="lazy" src={user.userImageLink} className="nav_bar_photo nav_bar_navbar_photo_size skeleton"/>
                        <span className={`${user.username ? "" : 'skeleton skeleton-navbar-title'}`}> 
                            {user?.username || ""} 
                        </span>
                        
                        <div className={`icon ${isDropdown ? 'rotate': ""}`}>
                            <img loading="lazy" width="23" height="23" src="https://img.icons8.com/color/48/expand-arrow--v1.png" alt="expand-arrow--v1" />
                        </div>
                        
                    </button>

                </div>

                {isDropdown && (

                <div className="dropdown-content" id="mainDropdown">
                    
                    <Link href="/profile">
                        
                        <div className="grid-container-dropdown">

                            <div className="grid-item-dropdown-1">
                                <img loading="lazy" src={user.userImageLink} alt="Picture of the user" loading="lazy" className="nav_bar_photo nav_bar_dropdown_photo_size" />
                            </div>

                            <div className="grid-item-dropdown-2">
                                <span className="firstLineText">{user.username}</span>
                                <br />
                                <span className="secondLineText">See your profile</span>
                            </div>

                        </div>

                    </Link>
                    
                    <hr />
                    
                    <Link href="/">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <img loading="lazy" width="30" height="30" src="https://img.icons8.com/color/48/popular-topic.png" alt="popular-topic"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Give Feedback</span>
                            </div>
                        </div>
                    </Link>
                    
                    <hr />
                    
                    <Link href="/">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <img loading="lazy" width="30" height="30" src="https://img.icons8.com/color/48/gear.png" alt="gear"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Settings</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="/">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <img loading="lazy" width="30" height="30" src="https://img.icons8.com/color/48/help--v1.png" alt="help--v1"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Help & Support</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="/">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <img loading="lazy" width="30" height="30" src="https://img.icons8.com/color/48/roller-brush--v1.png" alt="roller-brush--v1"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Display</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="#" onClick={() => LogOut()}>
                        <div className="grid-container-dropdown">

                            <div className="grid-item-dropdown-normal-first">
                                <img loading="lazy" width="30" height="30" src="https://img.icons8.com/color/48/logout-rounded--v1.png" alt="logout-rounded--v1"/>
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Log Out</span>
                            </div>
                            
                        </div>
                    </Link>

                </div>

                
                )}

            </div>
        
      </div>

    )
}

export default Navbar