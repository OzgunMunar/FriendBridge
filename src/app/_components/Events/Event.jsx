import "@/app/_styles/events.css"
import { useState, useEffect, useRef } from "react";

const Event = ({ event }) => {

    const [userCity, setUserCity] = useState("")
    const [isLiking, setIsLiking] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isDropdown, setIsDropdown] = useState(false)
    const CancelOrDeleteRef = useRef(null)
  
    useEffect(() => {

        const handleOutsideClick = (event) => {
  
            if (CancelOrDeleteRef.current && !CancelOrDeleteRef.current.contains(event.target)) {
              setIsDropdown(false);
            }
  
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
          document.removeEventListener('click', handleOutsideClick);
        }        

    }, [])

    useEffect(() => {

        const getCityFromIP = async () => {
            const res = await fetch('https://ipinfo.io/json?token=1732bbc0a78e2c')
            const data = await res.json()
            setUserCity(data.city)
        }

        getCityFromIP()

    }, [userCity])

    const OpenCloseDropDown = () => {

        setIsDropdown(status => !status)

    }

    const LikeEvent = (someValue) => {

        console.log(userCity)

    }

    const HandleExpand = () => {

        console.log("HandleExpand")

    }
  
    return (

        <div className="event_container">

            <div className="event_header">

                <div className="event_header_title">
                    <span>We are marrying!</span>
                </div>

                <div className="event_header_rightside">

                    <div className="event_header_ticket_price_container">
                        <span>Ticket Price: <span className="text-orange-600">$0</span></span>
                    </div>

                    <div className="event_header_right_actions_section" ref={CancelOrDeleteRef}>

                        <button className="event_actions_button"  onClick={() => OpenCloseDropDown()}>
                            <span>...</span>
                        </button>

                        {isDropdown && (

                            <div className="event_dropdown_content">

                                <div className="cancel_content">
                                    <img width="20" height="20" src="https://img.icons8.com/office/40/calendar-minus.png" alt="calendar-minus"/>
                                    <span>Cancel Event</span>
                                </div>

                                <div className="report_content">
                                    <img width="20" height="20" src="https://img.icons8.com/color/50/complaint.png" alt="complaint"/>
                                    <span>Report Event</span>
                                </div>

                            </div>

                        )}

                    </div>

                </div>

            </div>

            <div className="event_body">

                <div className="event_upper_body">

                    <div className="event_image_container">
                        <div className="event_event_type">
                            <span>Fun</span>
                        </div>
                        <img src="https://images.pexels.com/photos/10773770/pexels-photo-10773770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </div>

                    <div className="event_upper_body_buttons">

                        <button className="event_upper_body_button_join_event">Join Event</button>
                        <button className="event_upper_body_button_maybe">Maybe</button>

                    </div>

                </div>

                <div className="event_description">

                    <div className="event_description_title">
                        <span>Description</span>
                    </div>

                    <div className="event_description_text">
                        <p>💍✨ A Lifetime of Love Begins! ✨💍 </p> <p> Today marks the start of a beautiful journey as [Husban and Wife] said &quot;I do!&quot; 💖 </p> <p> From the first date to forever, we are beyond thrilled to witness their love story unfold. May your days be filled with laughter, your hearts with endless love, and your lives with unforgettable memories. Here is to love, joy, and a happily ever after! 🥂👰🤵</p>
                    </div>

                </div>

                <div className="event_horizontal_line"></div>

                <div className="event_mid_body">

                    <div className="event_mid_body_city">

                        <div className="event_mid_icon">
                            <img width="20" height="20" src="https://img.icons8.com/office/40/marker.png" alt="marker"/>
                        </div>

                        <div className="event_mid_city_text">
                            <span>City</span>
                            <span>London</span>
                        </div>

                    </div>

                    <div className="event_mid_body_weather">

                        <div className="event_mid_icon">
                            <img width="20" height="20" src="https://img.icons8.com/officel/80/cloud.png" alt="cloud"/>
                        </div>

                        <div className="event_mid_time_text">
                            <span>Weather</span>
                            <span>Clear</span>
                        </div>

                    </div>

                    <div className="event_mid_body_date">

                        <div className="event_mid_icon">
                            <img width="20" height="20" src="https://img.icons8.com/fluency/48/calendar--v1.png" alt="calendar--v1"/>
                        </div>

                        <div className="event_mid_date_text">
                            <span>Date</span>
                            <span>08 November 2024</span>
                        </div>

                    </div>

                    <div className="event_mid_body_time">

                        <div className="event_mid_icon">
                            <img width="20" height="20" src="https://img.icons8.com/fluency/48/calendar--v1.png" alt="calendar--v1"/>
                        </div>

                        <div className="event_mid_time_text">
                            <span>Time</span>
                            <span>6 PM to 9 PM</span>
                        </div>

                    </div>

                </div>

                <div className="event_horizontal_line"></div>

                <div className="event_lower_body">

                    <div className="event_lower_body_going">

                        <div className="event_lower_icon">
                            <img width="20" height="20" src="https://img.icons8.com/fluency/48/checkmark--v1.png" alt="checkmark--v1"/>
                        </div>

                        <div className="event_lower_going_text">
                            <span>Participants</span>
                            <span>12</span>
                        </div>

                    </div>

                    <div className="event_lower_body_maybe">

                        <div className="event_lower_icon">
                            <img width="20" height="20" src="https://img.icons8.com/emoji/48/question-mark-emoji.png" alt="question-mark-emoji"/>
                        </div>

                        <div className="event_lower_maybe_text">
                            <span>Maybe</span>
                            <span>8</span>
                        </div>

                    </div>

                </div>

            </div>

            <div className="event_horizontal_line"></div>

            <div className="event_footer">

                <div className="event_like_comment_share">

                    <div className="event_action_button" onClick={() => LikeEvent("eventId")} aria-disabled={isLiking}>
                        {
                            isLiked ?
                            <img width="20" height="20" src="https://img.icons8.com/office/30/hearts.png" alt="hearts"/>
                            :
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/like--v1.png" alt="like--v1"/>
                        }    
                        <p>{0} Likes</p>
                    </div>

                    <div className="event_action_button" onClick={() => HandleExpand()}>
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/chat-message--v1.png" alt="chat-message--v1"/>
                        <p>{0} Comments</p>
                    </div>

                    <div className="event_action_button">
                        <img width="20" height="20" src="https://img.icons8.com/material-rounded/24/share.png" alt="share"/>
                        <p>Share</p>
                    </div>

                </div>

            </div>

        </div>

    )

}

export default Event