import "@/app/_styles/leftsidebar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faEarthAmericas,
    faFloppyDisk,
    faGamepad,
    faNewspaper,
    faPeopleGroup,
    faRectangleAd,
    faUser,
    faRss
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./Contexts";

import React from 'react'

const LeftSideBar = () => {

  let { user } = React.useContext(UserContext)

  return (
    <div className='left_side_bar'>

        <ul className='left_side_bar_items'>

            <li>
              <div className='iconContainer'>
                <img src={user.userImageLink} alt="Picture of the post owner" loading="lazy" className="left_side_bar_post_photo" />
              </div>
              <span>{user.username}</span>
            </li>

            <li className="feedLi">
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faRss} />
              </div>
              <span>Feed</span>
            </li>

            <div className="left_side_bar_horizontal_line"></div>
            <li>
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faPeopleGroup} />
              </div>
              <span>Find Groups</span>
            </li>
            
            <li>
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faEarthAmericas} />
              </div>
              <span>Global Posts</span>
            </li>

            <li>
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faFloppyDisk} />
              </div>
              <span>Saved Posts</span>
            </li>

            <li>
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faCalendarDays} />
              </div>
              <span>Events</span>
            </li>
            
            <li>
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faRectangleAd} />
              </div>
              <span>Ad Manager</span>
            </li>
                     
            <li>
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faGamepad} />
              </div>
              <span>Play Games</span>
            </li>

            <li>
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faNewspaper} />
              </div>
              <span>Read News</span>
            </li>

        </ul>

    </div>
  )
}

export default LeftSideBar