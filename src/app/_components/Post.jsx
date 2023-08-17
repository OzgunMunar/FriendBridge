import "@/app/_styles/post.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComments, faShare, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./Contexts";
import {useContext, useRef, useState, useEffect} from 'react'

const Post = ({ post }) => {

    const { user } = useContext(UserContext)
    const EditOrDeleteRef = useRef(null)
    const [isDropdown, setIsDropdown] = useState(false);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dateAndTime = post.postedDate.split('T')
    const dayMonthYear = dateAndTime[0].split('-')
    const time = dateAndTime[1].split(":")
    
    function returnMonthName(monthNumber) {
        return monthNames[monthNumber - 1]
    }

    const fullDateText = `${dayMonthYear[2]} ${returnMonthName(dayMonthYear[1])} ${dayMonthYear[0]} at ${time[0]}:${time[1]}`

    function EditOrDeleteOpener() {
        setIsDropdown(status => !status)
    }

    useEffect(() => {

        const handleOutsideClick = (event) => {
  
          if (EditOrDeleteRef.current && !EditOrDeleteRef.current.contains(event.target)) {
            setIsDropdown(false);
          }
  
        };
  
        document.addEventListener('click', handleOutsideClick);
  
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
        
      }, []);

  return (
    <div className="post_container">

        <div className="post_header">

            <div className="post_header_left_section">

                <div className="post_user_image">
                    <img src={user.userImageLink} alt="Picture of the post owner" loading="lazy" className="post_photo" />
                </div>

                <div className="post_info">
                    <p className="post_owners_name">{post.creator.username}</p>
                    <p className="post_posted_date">{fullDateText}</p>
                </div>

            </div>
            
            <div className="right_section_container">
            
                <div ref={EditOrDeleteRef} className="post_header_right_actions_section">

                    <button className="right_actions_button" onClick={() => EditOrDeleteOpener()}>
                        ...
                    </button>

                </div>

                {isDropdown && (

                    
                    <div className="post_dropdown_content">

                        <p className="post_dropdown_content_action">
                            <FontAwesomeIcon icon={faPenToSquare} /> 
                            <span>Edit</span>
                        </p>
                        <div>|</div>
                        <p className="post_dropdown_content_action">
                            <FontAwesomeIcon icon={faTrash} /> 
                            <span>Delete</span>
                        </p>

                    </div>
                    

                )}

            </div>
        </div>

        <div className="post_body">
            <p>{post.post}</p>
        </div>

        <div className="post_horizontal_line"></div>

        <div className="post_like_comment_share">

            <div className="post_action_button">
                <FontAwesomeIcon icon={faThumbsUp} />
                <p>({post.likeNumber}) Like</p>
            </div>

            <div className="post_action_button">
                <FontAwesomeIcon icon={faComments} />
                <p>({post.comments.length}) Comments</p>
            </div>

            <div className="post_action_button">
                <FontAwesomeIcon icon={faShare} />
                <p>Share</p>
            </div>

        </div>

        <div className="post_horizontal_line"></div>

        <div className="post_comment_section">

        </div>

    </div>
  )
}

export default Post