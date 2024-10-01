import "@/app/_styles/leftsidebar.css"
import { UserContext } from "../Contexts/Contexts";
import React, { useContext, useState } from 'react'
import Link from "next/link";
import Image from "next/image";

const LeftSideBar = ({ page }) => {

  let { user }  = useContext(UserContext)
  const [isMouseOver, setIsMouseOver] = useState(false)

  function handleMouseEnter()
  {
    setIsMouseOver(true)
  }

  function handleMouseLeave()
  {
    setIsMouseOver(false)
  }

  return (
    <div className={`left_side_bar ${isMouseOver ? 'leftSideBarOpen':''}`}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

        <ul className='left_side_bar_items'>

            <Link href="/profile">
              <li className={`${page === 'Profile' ? "activeli":""}`}>
                <div className='iconContainer'>
                  {/* <Image src={user.userImageLink} 
                          alt="Picture of the post owner" 
                          loading="lazy" 
                          width={30}
                          height={30}
                          className="left_side_bar_post_photo"/> */}
                  <img src={user.userImageLink} alt="Picture of the post owner" loading="lazy" className="left_side_bar_post_photo" />
                </div>

                <span>{user.username}</span>
              </li>
            </Link>
            
            <Link href="/">
              <li className={`${page === 'Feed' ? "activeli":""}`}>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/rss.png" alt="rss"/>
                </div>

                <span>Feed</span>
              </li>
            </Link>

            <div className="left_side_bar_horizontal_line"></div>
            <li className="left_side_bar_title">
                <p className={`${isMouseOver ? 'block':'hidden'} whitespace-nowrap mt-0.5`}>Discover More</p>
            </li>

            <Link href="/">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/conference-call--v1.png" alt="conference-call--v1"/>
                </div>
                <span>Find Groups</span>
              </li>
            </Link>
            
            <Link href="/">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/earth-planet--v2.png" alt="earth-planet--v2"/>
                </div>
                <span>Global Posts</span>
              </li>
            </Link>

            <Link href="/">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/save-all.png" alt="save-all"/>
                </div>
                <span>Saved Posts</span>
              </li>
            </Link>

            <Link href="/">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/calendar--v1.png" alt="calendar--v1"/>
                </div>
                <span>Events</span>
              </li>
            </Link>

            <div className="left_side_bar_horizontal_line"></div>
              <li className="left_side_bar_title">
              <p className={`${isMouseOver ? 'block':'hidden'} whitespace-nowrap mt-0.5`}>App Related</p>
            </li>
            
            <Link href="/">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/speaker_1.png" alt="speaker_1"/>
                </div>
                <span>Ad Manager</span>
              </li>
            </Link>
            
            <Link href="/">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/controller.png" alt="controller"/>
                </div>
                <span>Play Games</span>
              </li>
            </Link>

            <Link href="/">
              <li>
                <div className='iconContainer'>
                  <img width="30" height="30" src="https://img.icons8.com/color/48/newspaper-.png" alt="newspaper-"/>
                </div>
                <span>Read News</span>
              </li>
            </Link>

        </ul>

    </div>
  )
}

export default LeftSideBar