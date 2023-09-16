import React, { Fragment, useContext } from 'react'
import axios from "axios"
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserContext } from '../Contexts/Contexts';
import '@/app/_styles/profile.css'
import Feed from '../Feed/Feed';

const Profile = () => {

    const router = useRouter()
    const [data, setData] = useState('nothing')
    const [isPasswordMailSent, setIsPasswordMailSent] = useState(false)

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
                            <div className='profile_personal_info_title'>Profession: </div>
                            <div className='profile_personal_info_value'>{user.profession}</div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>Phone Number: </div>
                            <div className='profile_personal_info_value'>
                                <a href={`tel:${user.phonenumber}`}>
                                    {user.phonenumber}
                                </a>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>Address: </div>
                            <div className='profile_personal_info_value'>{user.address}</div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>Email: </div>
                            <div className='profile_personal_info_value'><a href={`mailto:${user.email}`}>{user.email}</a></div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>Personal Web Site: </div>
                            <div className='profile_personal_info_value'><a href={`${user.personalwebsite}`}>{user.personalwebsite}</a></div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>Birthday: </div>
                            <div className='profile_personal_info_value'>{user.birthday}</div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>Gender: </div>
                            <div className='profile_personal_info_value'>{user.gender}</div>
                        </div>

                    </div>

                </div>

            </div>

            <Toaster position="top-right" reverseOrder={false}/>

        </Fragment>

    )

}

export default Profile
