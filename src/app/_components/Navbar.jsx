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

const Navbar = () => {

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

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);


  return (
    
    <div className="navbar" id="headerNavbar">

            <a href="#">
                <span id="logo">
                    Social App
                </span> 
            </a>

            <div className="tabs">
                <a href="#" className="headerTab">
                    <FontAwesomeIcon
                        icon={faRss}
                    />
                </a>

                <a href="#" className="headerTab">
                    <FontAwesomeIcon
                        icon={faFlag}
                    />
                </a>

                <a href="#" className="headerTab">
                    <FontAwesomeIcon
                        icon={faEnvelope}
                    />
                </a>

                <div ref={dropdownRef} className="dropdown">

                    <button className="dropbtn" onClick={() => headerMainDropdown()}>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                        />
                    </button>

                </div>

                {isDropdown && (

                <div className="dropdown-content" id="mainDropdown">
                    
                    <a href="#">

                        <div className="grid-container-dropdown">

                            <div className="grid-item-dropdown-1">
                                <FontAwesomeIcon
                                    icon={faUserAstronaut}
                                    style={{fontSize: '3em', marginRight: '0.5em'}}
                                />
                            </div>

                            <div className="grid-item-dropdown-2">
                                <span className="firstLineText">Ozgun Munar</span>
                                <br />
                                <span className="secondLineText">See your profile</span>
                            </div>

                        </div>

                    </a>
                    
                    <hr />
                    
                    <a href="#">
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
                    </a>
                    
                    <hr />
                    
                    <a href="#">
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
                    </a>

                    <a href="#">
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
                    </a>

                    <a href="#">
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
                    </a>

                    <a href="#">
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
                    </a>

                </div>

                
                )}

            </div>

    </div>
    
  )
}

export default Navbar