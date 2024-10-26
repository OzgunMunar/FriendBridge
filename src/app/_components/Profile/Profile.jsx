import React, { useState, useContext, useEffect, useRef  } from 'react'
import axios from "axios"
import { UserContext, FeedChangeContext, PageContext, PageLoaderContext } from '../Contexts/Contexts'
import Feed from '../Feed/Feed'
import ModalEditProfile from '../Modals/ModalEditProfile'
import '@/app/_styles/profile.css'
import { toast } from "react-toastify";

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
            toast.success("Email sent to change password.", { theme: "light" })
            setIsPasswordMailSent(true)

        } catch (error) {
            console.log(error)
            toast.error(error, { theme: "dark" })
            setIsPasswordMailSent(false)
        }
    }

    const handleSubmit = async() => {

        try {

            const result = await axios.post("/api/users/updateuserinfo", userInfo)
            toast.success(result.data.message, { theme: "light" })

            setModalShow(false)
            setUserInfoRefreshSwitch(val => !val)
            
        } catch (error) {
            toast.error(error.response.data.message, { theme: "dark" })
        }

    }

    return (

        <div className='profile_container'>
            
            <div className='profile_first_section_container'>

                <div className='profile_picture_container'>
                    <img src={user.userImageLink} alt="Picture of the post owner" loading="lazy" className="profile_picture" />
                </div>

                <div className='profile_divider_div'>
                    <div className='profile_personal_info'>

                        <div className='profile_personal_info1_layer1'>

                            <span className='profile_username'>{userInfo.username}</span>

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
                            <div className='profile_personal_info_value text-sky-600'>
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
                            <div className='profile_personal_info_value text-sky-600'>
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
                            <div className='profile_personal_info_value text-sky-600 website-text'>
                                <a href={`${userInfo.personalwebsite}`} target='_blank'>
                                    { userInfo.personalwebsite }
                                </a>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='profile_personal_info_title'>
                                <img width="20" height="20" src="https://img.icons8.com/fluency/48/birthday.png" alt="birthday"/>
                                <span>Birthday: </span>
                            </div>
                            <div className='profile_personal_info_value'>{ userInfo.birthday ? userInfo.birthday : "unshared" }</div>
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

                    <div className="profile_action_buttons">

                    <div className='profile_edit_button_container'>

                        <button type='button' className='profile_edit_button' onClick={openModalToEdit}>
                            <img width="30" height="30" src="https://img.icons8.com/color/48/map-editing.png" alt="map-editing"/>
                            Edit Profile
                        </button>

                    </div>

                    <div className={`profile_change_password_container  ${isPasswordMailSent === true ? 'disabled-button':''}`}>

                        <button type='button' 
                                className={`profile_change_password_button ${isPasswordMailSent ? 'cursor-not-allowed bg-rose-500 text-dark':''}`}
                                onClick={changePassword} 
                                disabled={isPasswordMailSent}>
                            
                            {
                                isPasswordMailSent ? 

                                    <img width="30" height="30" src="https://img.icons8.com/office/30/reading-confirmation.png" alt="reading-confirmation"/>
                                    :
                                    <img width="30" height="30" src="https://img.icons8.com/dusk/64/send.png" alt="send"/>

                            }
                            
                            {isPasswordMailSent ? 'Email sent':'Change Password'}
                        </button>

                    </div>

                    </div>
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

            <div className='modal-code'>

                <div className={`${isModalShow === true ? "modal-container active":"modal-container"}`}>

                    <ModalEditProfile usernameRef={usernameRef} userInfo={userInfo} 
                                      isOpen={isModalShow} onClose={closeModalToEdit} 
                                      handleSubmit={handleSubmit} setuserInfo={setuserInfo} />

                </div>

            </div>

        </div>

    )

}

export default Profile