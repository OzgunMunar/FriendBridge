import React from 'react'
import "@/app/_styles/mainrightside.css"
import Link from 'next/link'

const MainRightSide = () => {

  return (

    <div className="main_right_side_container">

        <div className="main_right_side_suggestion_container">

            <p className="main_right_side_title">
                Suggestions For You(Dummy Info)
            </p>

            <div className="main_right_side_suggested_people_container">

                <div className="suggested_person_container">

                    <Link href={`/dennisdilneoux`}>
                        <div className="suggested_person_info">
                            <img loading="lazy" width="50" height="50" src="https://images.pexels.com/photos/11718221/pexels-photo-11718221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <span>Dennis Dilneoux</span>
                        </div>
                    </Link>

                    <div className="suggested_person_buttons">

                        <button className="suggested_person_button follow_button">
                            <img loading="lazy" width="20" height="20" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                            <span className="suggested_person_button_text">Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img loading="lazy" width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span className="suggested_person_button_text">Dismiss</span>
                        </button>

                    </div>

                </div>

                <div className="suggested_person_container">

                    <Link href={`/illinoismarbel`}>
                        <div className="suggested_person_info">
                            <img loading="lazy" width="50" height="50" src="https://images.pexels.com/photos/11410644/pexels-photo-11410644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <span>Illinois Marbel</span>
                        </div>
                    </Link>

                    <div className="suggested_person_buttons">

                        <button className="suggested_person_button follow_button">
                            <img loading="lazy" width="20" height="20" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                            <span className="suggested_person_button_text">Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img loading="lazy" width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span className="suggested_person_button_text">Dismiss</span>
                        </button>

                    </div>

                </div>

                <div className="suggested_person_container">

                    <Link href={`/susanscrumg`}>
                        <div className="suggested_person_info">
                            <img loading="lazy" width="50" height="50" src="https://images.pexels.com/photos/11844361/pexels-photo-11844361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                            <span>Susan Scrumg</span>
                        </div>
                    </Link>

                    <div className="suggested_person_buttons">

                        <button className="suggested_person_button follow_button">
                            <img loading="lazy" width="20" height="20" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                            <span className="suggested_person_button_text">Follow</span>
                        </button>

                        <button className="suggested_person_button unfollow_button">
                            <img loading="lazy" width="20" height="20" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            <span className="suggested_person_button_text">Dismiss</span>
                        </button>

                    </div>

                </div>

            </div>

        </div>

        <div className="main_right_side_activities_container">

            <p className="main_right_side_title">
                Latest Activities(Dummy Info)
            </p>

            <div className="main_right_side_latest_activities_container">

                <div className="latest_activity_container">

                    <div className="latest_activity_info">

                        <Link href={`/dennisdilneoux`}>
                            <img loading="lazy" width="50" height="50" src="https://images.pexels.com/photos/11718221/pexels-photo-11718221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </Link>
                        <span className="w-full"><Link href={`/dennisdilneoux`}>Dennis Dilneoux</Link> <span className='text-gray-500'>liked a post, <span className='time-indicator'>1 min ago</span>.</span></span>

                    </div>

                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">

                        <Link href={`/apriloneille`}>
                            <img loading="lazy" width="50" height="50" src="https://images.pexels.com/photos/14686837/pexels-photo-14686837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </Link>
                        <span className="w-full"><Link href={`/apriloneille`}>April ONeille</Link> <span className='text-gray-500'>liked a post, <span className='time-indicator'>1 min ago</span>.</span></span>

                    </div>
                    
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <Link href={`/sarahdigsop`}>
                            <img loading="lazy" width="50" height="50" src="https://images.pexels.com/photos/7562139/pexels-photo-7562139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </Link>
                        <span className="w-full"><Link href={`/sarahdigsop`}>Sarah Digsop</Link> <span className='text-gray-500'>poked you, <span className='time-indicator'>3 min ago</span>.</span></span>
                    </div>
                    
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <Link href={`/susanfroide`}>
                            <img loading="lazy" width="50" height="50" src="https://images.pexels.com/photos/14587417/pexels-photo-14587417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </Link>
                        <span className="w-full"><Link href={`/susanfroide`}>Susan Froide</Link> <span className='text-gray-500'>liked a comment, <span className='time-indicator'>4 min ago</span>.</span></span>
                    </div>
                    
                </div>

                <div className="latest_activity_container">

                    <div className="latest_activity_info">
                        <Link href={`/markgubrell`}>
                            <img loading="lazy" width="50" height="50" src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
                        </Link>
                        <span className="w-full"><Link href={`/markgubrell`}>Mark Gubrell</Link> <span className='text-gray-500'>changed his profile picture, <span className='time-indicator'>10 min ago</span>.</span></span>
                    </div>
                    
                </div>

            </div>
        </div>

    </div>

  )

}

export default MainRightSide