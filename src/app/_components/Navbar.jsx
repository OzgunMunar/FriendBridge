'use client'

import React, { useState, useEffect, useRef } from "react";
import '@/app/_styles/navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faCommentMedical,
    faEnvelope,
    faFlag,
    faHandsHelping,
    faMoon,
    faRss,
    faSignOutAlt,
    faUserAstronaut,
    faUsersCog,
} from "@fortawesome/free-solid-svg-icons";

import { Toaster, toast } from "react-hot-toast";
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = ({username}) => {

    const router = useRouter()
    const [isDropdown, setIsDropdown] = useState(false)
    const dropdownRef = useRef(null)

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

        console.log("asd")

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
                <Link href="/" className="headerTab">
                    <FontAwesomeIcon
                        icon={faRss}
                    />
                </Link>

                <Link href="/notifications" className="headerTab">
                    <FontAwesomeIcon
                        icon={faFlag}
                    />
                </Link>

                <Link href="/" className="headerTab">
                    <FontAwesomeIcon
                        icon={faEnvelope}
                    />
                </Link>

                <div ref={dropdownRef} className="dropdown">

                    <button className="dropbtn" onClick={() => headerMainDropdown()}>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                        />
                    </button>

                </div>

                {isDropdown && (

                <div className="dropdown-content" id="mainDropdown">
                    
                    <Link href="/profile">
                        
                        <div className="grid-container-dropdown">

                            <div className="grid-item-dropdown-1">
                                <FontAwesomeIcon
                                    icon={faUserAstronaut}
                                    style={{fontSize: '3em', marginRight: '0.5em'}}
                                />
                            </div>

                            <div className="grid-item-dropdown-2">
                                <span className="firstLineText">{username}</span>
                                <br />
                                <span className="secondLineText">See your profile</span>
                            </div>

                        </div>

                    </Link>
                    
                    <hr />
                    
                    <Link href="/givefeedback">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <FontAwesomeIcon
                                    icon={faCommentMedical}
                                />
                                <i className="fas fa-comment-medical"></i>
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
                                <FontAwesomeIcon
                                    icon={faUsersCog}
                                />
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Settings</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="/helpandsupport">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <FontAwesomeIcon
                                    icon={faHandsHelping}
                                />
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Help & Support</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="/display">
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <FontAwesomeIcon
                                    icon={faMoon}
                                />
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Display</span>
                            </div>
                        </div>
                    </Link>

                    <Link href="#" onClick={() => LogOut()}>
                        <div className="grid-container-dropdown">
                            <div className="grid-item-dropdown-normal-first">
                                <FontAwesomeIcon
                                    icon={faSignOutAlt}
                                />
                            </div>

                            <div className="grid-item-dropdown-normal">
                                <span>Log Out</span>
                            </div>
                        </div>
                    </Link>

                </div>

                
                )}

            </div>

            <Toaster position="top-right" reverseOrder={false}/>
        
      </div>

    )
}

export default Navbar