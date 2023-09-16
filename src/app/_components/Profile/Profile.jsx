import React, { Fragment, useContext } from 'react'
import axios from "axios"
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserContext, FeedChangeContext } from '../Contexts/Contexts';
import '@/app/_styles/profile.css'
import Feed from '../Feed/Feed';

const Profile = () => {

    const router = useRouter()
    const [data, setData] = useState('nothing')
    const [isPasswordMailSent, setIsPasswordMailSent] = useState(false)
    const [shouldFeedChange, setShouldFeedChangeSwitch] = useState(false)

    const { user } = useContext(UserContext)

    console.log(user)

    const changePassword = async () => {

        try {
            
            await axios.post('/api/users/sendmailofchangepassword')
            
            setIsPasswordMailSent(true)

        } catch (error) {
            toast.error(error.response.data.message)
            setIsPasswordMailSent(false)
        }

    }

    return (

        <Fragment>

            <div className='profile_container'>

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
                            <div className='profile_personal_info_value blue-text'>
                                <a href={`${user.personalwebsite}`}>
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

            </div>

            <div className='profile_feed_title_container'>
                <p className='profile_feed_title'>Personal Posts</p>
            </div>

            <div className='profile_feed_container'>
            
                <FeedChangeContext.Provider value={{ shouldFeedChange, setShouldFeedChangeSwitch }}>
                    <Feed />
                </FeedChangeContext.Provider>

            </div>

            <Toaster position="top-right" reverseOrder={false}/>

        </Fragment>

    )

}

export default Profile
