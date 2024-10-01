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
                            <span>Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span>Unfollow</span>
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
                            <span>Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span>Unfollow</span>
                        </button>

                    </div>

                </div>

                <div className="suggested_person_container">

                    <div className="suggested_person_info">
                        <img width="50" height="50" src="https://tinyurl.com/3bzrs57n" />
                        <span>Dennis Dilneoux</span>
                    </div>

                    <div className="suggested_person_buttons">

                        <button className="suggested_person_button follow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                            <span>Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span>Unfollow</span>
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
                        <p>Dennis Dilneoux <span className='text-gray-500'>changed his profile picture.</span></p>
                    </div>
                    <span className="text-end text-gray-500">1 min ago</span>
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/4snvu7b3" />
                        <p>April O'Neille <span className='text-gray-500'>liked a post.</span></p>
                    </div>
                    <span className="text-end text-gray-500">1 min ago</span>
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/5n7vrxza" />
                        <p>Sarah Digsop <span className='text-gray-500'>poked you.</span></p>
                    </div>
                    <span className="text-end text-gray-500">3 min ago</span>
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/4zrbvv9r" />
                        <p>Susan Froide <span className='text-gray-500'>liked a comment.</span></p>
                    </div>
                    <span className="text-end text-gray-500">4 min ago</span>
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <img width="50" height="50" src="https://tinyurl.com/3xppu43t" />
                        <p>Mark Gubrell <span className='text-gray-500'>changed his profile picture.</span></p>
                    </div>
                    <span className="text-end text-gray-500">10 min ago</span>
                </div>

            </div>
        </div>

    </div>

  )

}

export default MainRightSide