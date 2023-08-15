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
} from "@fortawesome/free-solid-svg-icons";
import HorizontalLine from "./HorizontalLine";

const LeftSideBar = ({ username }) => {

  return (
    <div className='left_side_bar'>

        <ul className='left_side_bar_items'>

            <li>
              <div className='iconContainer'>
                <FontAwesomeIcon className="left_side_bar_icon" icon={faUser} />
              </div>
              <span>{username}</span>
            </li>
            <HorizontalLine />
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