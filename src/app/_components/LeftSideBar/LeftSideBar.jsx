import "@/app/_styles/leftsidebar.css"
import React, { useState, useContext } from 'react'
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { UserContext } from "../Contexts/Contexts";
import { usePathname } from "next/navigation";

const LeftSideBar = () => {

  const { user } = useContext(UserContext)
  const pathname = usePathname()

  return (
    
    <div className="left_side_bar leftSideBarOpen">

        <ul className='left_side_bar_items'>

            <Link href={`/${user.userCodeName}`} id="profile_leftside_button">
              <li className={`${pathname === `/${user.userCodeName}` ? "activeli":""}`}>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/fluency/48/user-location.png" alt="profile"/>
                </div>

                <span>Profile</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#profile_leftside_button' 
                    content='Profile' 
                    place='right'
                    className='lg:hidden'
                    offset={10}
                    effect='solid'
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />
            
            <Link href="/" id="feed_leftside_button">
              <li className={`${pathname === "/" ? "activeli":""}`}>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/rss.png" alt="rss"/>
                </div>

                <span>Feed</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#feed_leftside_button' 
                    content='Feed' 
                    place='right'
                    className='lg:hidden'
                    offset={10}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />

            <Link href="/" id="savedposts_leftside_button">
              <li>
                <div className='iconContainer'>
                  <img width="25" height="25" src="https://img.icons8.com/external-prettycons-flat-prettycons/47/external-bookmark-web-seo-prettycons-flat-prettycons.png" alt="save-all"/>
                </div>
                <span>Saved Posts</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#savedposts_leftside_button' 
                    content='Saved Posts' 
                    place='right'
                    className='lg:hidden'
                    offset={10}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />
            
            <Link href="/" id="globalposts_leftside_button">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/earth-planet--v2.png" alt="earth-planet--v2"/>
                </div>
                <span>Global Posts</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#globalposts_leftside_button' 
                    content='Global Posts' 
                    place='right'
                    className='lg:hidden'
                    offset={10}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />

            <Link href="/" id="findgroup_leftside_button">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/conference-call--v1.png" alt="conference-call--v1"/>
                </div>
                <span>Find Groups</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#findgroup_leftside_button' 
                    content='Find Group' 
                    place='right'
                    className='lg:hidden'
                    offset={10}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />

            <Link href="/" id="events_leftside_button">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/calendar--v1.png" alt="calendar--v1"/>
                </div>
                <span>Events</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#events_leftside_button' 
                    content='Events' 
                    place='right'
                    className='lg:hidden'
                    offset={10}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />
            
            <Link href="/" id="admanager_leftside_button">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/speaker_1.png" alt="speaker_1"/>
                </div>
                <span>Ad Manager</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#admanager_leftside_button' 
                    content='Ad Manager' 
                    place='right' 
                    className='lg:hidden'
                    offset={10}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />
            
            <Link href="/" id="playgames_leftside_button">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/controller.png" alt="controller"/>
                </div>
                <span>Play Games</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#playgames_leftside_button' 
                    content='Play Games' 
                    place='right'
                    className='lg:hidden'
                    offset={10}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />

            <Link href="/" id="readnews_leftside_button">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/newspaper-.png" alt="newspaper-"/>
                </div>
                <span>Read News</span>
              </li>
            </Link>
            <Tooltip 
                    anchorSelect='#readnews_leftside_button' 
                    content='Read News' 
                    place='right'
                    className='lg:hidden'
                    offset={10}
                    style={{backgroundColor: "rgb(59, 130, 246)", color: "#FFF"}}
                    />

        </ul>

    </div>
  )
}

export default LeftSideBar