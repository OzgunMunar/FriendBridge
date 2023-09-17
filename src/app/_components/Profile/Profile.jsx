import React, { useContext, useEffect } from 'react'
import axios from "axios"
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react"
import { UserContext, FeedChangeContext, PageContext } from '../Contexts/Contexts'
import '@/app/_styles/profile.css'
import Feed from '../Feed/Feed'
import Tooltip from '../Tooltip/Tooltip';

const Profile = () => {

    const [shouldFeedChange, setShouldFeedChangeSwitch] = useState(false)
    const [isModalShow, setModalShow] = useState(false)

    // add modal to change user infos as well as change password

    const { user } = useContext(UserContext)
    const { setPage } = useContext(PageContext)

    useEffect(() => {
        setPage('Profile')
    }, [])

    const changePassword = async () => {

        try {
            
            await axios.post('/api/users/sendmailofchangepassword')
            
            toast.success("Email sent to change password.")

        } catch (error) {
            toast.error(error.response.data.message)
            // setIsPasswordMailSent(false)
        }

    }

    return (

        <div className='profile_container'>

            <div className='profile_first_section_container'>

                <div className='profile_picture_container'>
                    <img src={user.userImageLink} alt="Picture of the post owner" loading="lazy" className="profile_picture" />
                </div>

                <div className='profile_personal_info'>

                    <div className='profile_personal_info1_layer1'>

                        <span className='profile_username'>{user.username}</span>
                        <div className='profile_city_container'>
                            <img width="16" height="16" src="https://img.icons8.com/office/16/marker.png" alt="marker"/>
                            <span className='profile_city'>{user.city}</span>
                        </div>

                    </div>
                    
                    <div className='profile_personal_info1_layer2'>
                        
                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-job-job-search-flaticons-lineal-color-flat-icons-3.png" alt="external-job-job-search-flaticons-lineal-color-flat-icons-3"/>
                                <span>Profession: </span>
                            </div>
                            <div className='profile_personal_info_value'>{user.profession}</div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/doodle/48/phone--v1.png" alt="phone--v1"/>
                                <span>Phone Number:</span> 
                            </div>
                            <div className='profile_personal_info_value blue-text'>
                                <a href={`tel:${user.phonenumber}`}>
                                    {user.phonenumber}
                                </a>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/plasticine/100/home.png" alt="home"/>
                                <span>Address: </span>
                            </div>
                            <div className='profile_personal_info_value'>{user.address}</div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/fluency/48/mail--v1.png" alt="mail--v1"/>
                                <span>Email:</span>
                            </div>
                            <div className='profile_personal_info_value blue-text'>
                                <a href={`mailto:${user.email}`}>
                                    {user.email}
                                </a>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/color/48/domain--v1.png" alt="domain--v1"/>
                                <span>Personal Web Site: </span>
                            </div>
                            <div className='profile_personal_info_value blue-text website-text'>
                                <a href={`${user.personalwebsite}`} target='_blank'>
                                    {user.personalwebsite}
                                </a>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/fluency/48/birthday.png" alt="birthday"/>
                                <span>Birthday: </span>
                            </div>
                            <div className='profile_personal_info_value'>{user.birthday}</div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/dusk/64/gender.png" alt="gender"/>
                                <span>Gender: </span>
                            </div>
                            <div className='profile_personal_info_value'>{user.gender}</div>
                        </div>

                    </div>

                </div>

                <div className='profile_edit_button_container'>

                    <Tooltip text='Edit'>
                        <button type='button' className='profile_edit_button' onClick={() => setModalShow(val => !val)}>
                            <img width="30" height="30" src="https://img.icons8.com/color/48/map-editing.png" alt="map-editing"/>
                        </button>
                    </Tooltip>

                </div>

                <div className='profile_change_password_container'>

                    <Tooltip text='Change Password'>
                        <button type='button' className='profile_change_password_button' onClick={changePassword}>
                            <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/send-mass-email.png" alt="send-mass-email"/>
                        </button>
                    </Tooltip>

                </div>

            </div>

            <div className='profile_feed_title_container'>
                <span className='divider'></span>
                <p className='profile_feed_title'>Post History</p>
                <span className='divider'></span>
            </div>

            <div className='profile_feed_container'>
            
                <FeedChangeContext.Provider value={{ shouldFeedChange, setShouldFeedChangeSwitch }}>
                    <Feed />
                </FeedChangeContext.Provider>

            </div>

            <Toaster position="top-right" reverseOrder={false}/>

        </div>

    )

}

export default Profile
