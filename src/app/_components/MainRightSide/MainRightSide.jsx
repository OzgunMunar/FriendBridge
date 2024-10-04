import React from 'react'
import "@/app/_styles/mainrightside.css"

const MainRightSide = () => {

  return (

    <div className="main_right_side_container">

        <div className="main_right_side_suggestion_container">

            <p className="main_right_side_title">
                Suggestions For You
            </p>

            <div className="main_right_side_suggested_people_container">

                <div className="suggested_person_container">

                    <div className="suggested_person_info">
                        <img width="50" height="50" src="https://tinyurl.com/yc4wdw9a" />
                        <span>Dennis Dilneoux</span>
                    </div>

                    <div className="suggested_person_buttons">

                        <button className="suggested_person_button follow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                            <span className="suggested_person_button_text">Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span className="suggested_person_button_text">Dismiss</span>
                        </button>

                    </div>

                </div>

                <div className="suggested_person_container">

                    <div className="suggested_person_info">
                        <img width="50" height="50" src="https://tinyurl.com/4dkt64cx" />
                        <span>Illinois Marbel</span>
                    </div>

                    <div className="suggested_person_buttons">

                        <button className="suggested_person_button follow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                            <span className="suggested_person_button_text">Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span className="suggested_person_button_text">Dismiss</span>
                        </button>

                    </div>

                </div>

                <div className="suggested_person_container">

                    <div className="suggested_person_info">
                        <img width="50" height="50" src="https://tinyurl.com/3bzrs57n" />
                        <span>Susan Scrumg</span>
                    </div>

                    <div className="suggested_person_buttons">

                        <button className="suggested_person_button follow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                            <span className="suggested_person_button_text">Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span className="suggested_person_button_text">Dismiss</span>
                        </button>

                    </div>

                </div>

            </div>

        </div>

        <div className="main_right_side_activities_container">

            <p className="main_right_side_title">
                Latest Activities
            </p>

            <div className="main_right_side_latest_activities_container">

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/yc4wdw9a" />
                        <p>Dennis Dilneoux<span className="text-gray-500"> changed his profile picture, <span className='time-indicator'>1 min ago</span>.</span></p>
                    </div>

                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/4snvu7b3" />
                        <p>April ONeille <span className='text-gray-500'>liked a post, <span className='time-indicator'>1 min ago</span>.</span></p>
                    </div>
                    
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/5n7vrxza" />
                        <p>Sarah Digsop <span className='text-gray-500'>poked you, <span className='time-indicator'>3 min ago</span>.</span></p>
                    </div>
                    
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/4zrbvv9r" />
                        <p>Susan Froide <span className='text-gray-500'>liked a comment, <span className='time-indicator'>4 min ago</span>.</span></p>
                    </div>
                    
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/3xppu43t" />
                        <p>Mark Gubrell <span className='text-gray-500'>changed his profile picture, <span className='time-indicator'>10 min ago</span>.</span></p>
                    </div>
                    
                </div>

            </div>
        </div>

    </div>

  )

}

export default MainRightSide