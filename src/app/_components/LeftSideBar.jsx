import "@/app/_styles/leftsidebar.css"
import { UserContext } from "./Contexts";

import React from 'react'
import Link from "next/link";

const LeftSideBar = () => {

  let { user } = React.useContext(UserContext)

  return (
    <div className='left_side_bar'>

        <ul className='left_side_bar_items'>

            <li>
              <Link href="/profile" className="left_side_bar_link_items">
                <div className='iconContainer'>
                  <img src={user.userImageLink} alt="Picture of the post owner" loading="lazy" className="left_side_bar_post_photo" />
                </div>
                <span>{user.username}</span>
              </Link>
            </li>

            <li className="feedLi">
              <div className='iconContainer'>
                <img width="30" height="30" src="https://img.icons8.com/color/48/rss.png" alt="rss"/>
              </div>
              <span>Feed</span>
            </li>

            <div className="left_side_bar_horizontal_line"></div>
            <li>
              <div className='iconContainer'>
                <img width="30" height="30" src="https://img.icons8.com/color/48/conference-call--v1.png" alt="conference-call--v1"/>
              </div>
              <span>Find Groups</span>
            </li>
            
            <li>
              <div className='iconContainer'>
                <img width="30" height="30" src="https://img.icons8.com/color/48/earth-planet--v2.png" alt="earth-planet--v2"/>
              </div>
              <span>Global Posts</span>
            </li>

            <li>
              <div className='iconContainer'>
                <img width="30" height="30" src="https://img.icons8.com/color/48/save-all.png" alt="save-all"/>
              </div>
              <span>Saved Posts</span>
            </li>

            <li>
              <div className='iconContainer'>
                <img width="30" height="30" src="https://img.icons8.com/color/48/calendar--v1.png" alt="calendar--v1"/>
              </div>
              <span>Events</span>
            </li>
            
            <li>
              <div className='iconContainer'>
                <img width="30" height="30" src="https://img.icons8.com/color/48/speaker_1.png" alt="speaker_1"/>
              </div>
              <span>Ad Manager</span>
            </li>
                     
            <li>
              <div className='iconContainer'>
                <img width="30" height="30" src="https://img.icons8.com/color/48/controller.png" alt="controller"/>
              </div>
              <span>Play Games</span>
            </li>

            <li>
              <div className='iconContainer'>
                <img width="30" height="30" src="https://img.icons8.com/color/48/newspaper-.png" alt="newspaper-"/>
              </div>
              <span>Read News</span>
            </li>

        </ul>

    </div>
  )
}

export default LeftSideBar