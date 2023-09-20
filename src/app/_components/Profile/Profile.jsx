import React, { useState, useContext, useEffect, useRef, useLayoutEffect } from 'react'
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import { UserContext, FeedChangeContext, PageContext, PageLoaderContext } from '../Contexts/Contexts'
import Feed from '../Feed/Feed'
import Tooltip from '../Tooltip/Tooltip'
import ModalEditProfile from '../Modals/ModalEditProfile'
import '@/app/_styles/profile.css'

const Profile = () => {

    const { user, setUserInfoRefreshSwitch } = useContext(UserContext)
    const { setPage } = useContext(PageContext)
    const { setLoader } = useContext(PageLoaderContext)
    
    const [shouldFeedChange, setShouldFeedChangeSwitch] = useState(false)
    const [isModalShow, setModalShow] = useState(false)
    const [isPasswordMailSent, setIsPasswordMailSent] = useState(false)

    const usernameRef = useRef(null)

    const [userInfo, setuserInfo] = useState({

        username: '',
        userImageLink: '',
        address: '',
        city: '',
        personalwebsite: '',
        phonenumber: '',
        profession: '',
        birthday: '',
        gender: ''

    })

    useEffect(() => {

        setPage('Profile')
        setLoader(false)

    }, [])

    useEffect(() => {

        setuserInfo({

            username: user?.username || '',
            userImageLink: user?.userImageLink || '',
            address: user?.address || '',
            city: user?.city || '',
            personalwebsite: user?.personalwebsite || '',
            phonenumber: user?.phonenumber || '',
            profession: user?.profession || '',
            birthday: user?.birthday || '',
            gender: user?.gender || ''
    
        })

    },[user])

    useEffect(() => {

        if (isModalShow === true) 
            usernameRef.current.focus()

    }, [isModalShow])

    const openModalToEdit = () => {
        setModalShow(true)
        setUserInfoRefreshSwitch(val => !val)
    }

    const closeModalToEdit = () => {
        setModalShow(false)
        setUserInfoRefreshSwitch(val => !val)
    }

    const changePassword = async() => {

        try {
            
            await axios.post('/api/users/sendmailofchangepassword')
            toast.success("Email sent to change password.")
            setIsPasswordMailSent(true)

        } catch (error) {
            toast.error(error.response.data.message)
            setIsPasswordMailSent(false)
        }

    }

    const handleSubmit = async() => {

        try {

            const result = await axios.post("/api/users/updateuserinfo", userInfo)
            toast.success(result.data.message)

            setModalShow(false)
            setUserInfoRefreshSwitch(val => !val)
            
        } catch (error) {
            toast.error(error.response.data.message)
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

                        <span className='profile_username'>{userInfo.username}</span>
                        <div className='profile_city_container'>
                            <img width="16" height="16" src="https://img.icons8.com/office/16/marker.png" alt="marker"/>
                            <span className='profile_city'>{userInfo.city}</span>
                        </div>

                    </div>
                    
                    <div className='profile_personal_info1_layer2'>
                        
                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-job-job-search-flaticons-lineal-color-flat-icons-3.png" alt="external-job-job-search-flaticons-lineal-color-flat-icons-3"/>
                                <span>Profession: </span>
                            </div>
                            <div className='profile_personal_info_value'>{userInfo.profession}</div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/doodle/48/phone--v1.png" alt="phone--v1"/>
                                <span>Phone Number:</span> 
                            </div>
                            <div className='profile_personal_info_value blue-text'>
                                <a href={`tel:${userInfo.phonenumber}`}>
                                    {userInfo.phonenumber}
                                </a>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/plasticine/100/home.png" alt="home"/>
                                <span>Address: </span>
                            </div>
                            <div className='profile_personal_info_value'>{userInfo.address}</div>
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
                                <a href={`${userInfo.personalwebsite}`} target='_blank'>
                                    {userInfo.personalwebsite}
                                </a>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/fluency/48/birthday.png" alt="birthday"/>
                                <span>Birthday: </span>
                            </div>
                            <div className='profile_personal_info_value'>{userInfo.birthday}</div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/dusk/64/gender.png" alt="gender"/>
                                <span>Gender: </span>
                            </div>
                            <div className='profile_personal_info_value'>{userInfo.gender}</div>
                        </div>

                    </div>

                </div>

                <div className='profile_edit_button_container'>

                    <Tooltip text='Edit'>
                        <button type='button' className='profile_edit_button' onClick={openModalToEdit}>
                            <img width="30" height="30" src="https://img.icons8.com/color/48/map-editing.png" alt="map-editing"/>
                        </button>
                    </Tooltip>

                </div>

                <div className={`profile_change_password_container  ${isPasswordMailSent === true ? 'disabled-button':''}`}>

                    <Tooltip text={`${isPasswordMailSent === true ? 'Email already sent':'Change Password'}`}>
                        <button type='button' 
                                className='profile_change_password_button'
                                onClick={changePassword} 
                                disabled={isPasswordMailSent}>
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

            <Toaster position="top-center" reverseOrder={false} />

            <div className='modal-code'>

                <div className={`${isModalShow === true ? "modal-container active":"modal-container"}`}>

                    <ModalEditProfile usernameRef={usernameRef} userInfo={userInfo} isOpen={isModalShow} onClose={closeModalToEdit} handleSubmit={handleSubmit} />

                </div>

            </div>

        </div>

    )

}

export default Profile