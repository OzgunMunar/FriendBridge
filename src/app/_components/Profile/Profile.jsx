'use client'

import React, { useState, useContext, useEffect, useRef } from 'react'
import axios from "axios"
import { Toaster, toast } from "react-hot-toast"
import { UserContext, FeedChangeContext, PageContext } from '../Contexts/Contexts'
import Feed from '../Feed/Feed'
import Tooltip from '../Tooltip/Tooltip'
import ModalEditProfile from '../Modals/ModalEditProfile'
import '@/app/_styles/profile.css'

const Profile = () => {

    const user = useContext(UserContext)
    const { setPage } = useContext(PageContext)
    
    const [shouldFeedChange, setShouldFeedChangeSwitch] = useState(false)
    const [isModalShow, setModalShow] = useState(true)
    const [isPasswordMailSent, setIsPasswordMailSent] = useState(false)

    const [userInfoToEdit, setUserInfoToEdit] = useState({

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

    }, [])

    useEffect(() => {

        setUserInfoToEdit({

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

    const openModalToEdit = () => {
        setModalShow(true)
    }

    const closeModalToEdit = () => {
        setModalShow(false)
    }

    const changePassword = async () => {

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

            const result = await axios.post("/api/users/updateuserinfo", userInfoToEdit)
            toast.success(result.data.message)
            setModalShow(false)
            
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

            <Toaster position="top-right" reverseOrder={false}/>

            <div className='modal-code'>

                <div className={`${isModalShow === true ? "modal-container active":"modal-container"}`}>

                    <ModalEditProfile isOpen={isModalShow} onClose={closeModalToEdit}>
                        
                        <div className='modalprofile_container'>
                            
                            <div className='modalprofile_header_container'>
                                <p className='modalprofile_header'>Edit Profile</p>
                            </div>

                            <div className='modalprofile_body_container'>

                                <div className='modal_info_row'>
                                    <label htmlFor='username'>Full Name:</label>
                                    <input type='text' id='username' 
                                           className='modal_info_input'
                                           defaultValue={userInfoToEdit.username}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, username: e.target.value})}/>
                                </div>

                                <div className='modal_info_row'>
                                    <label htmlFor='userImageLink'>User Image Link:</label>
                                    <input type='text' id='userImageLink'
                                           className='modal_info_input'
                                           value={userInfoToEdit.userImageLink}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, userImageLink: e.target.value})}/>
                                </div>

                                <div className='modal_info_row'>
                                    <label htmlFor='city'>City:</label>
                                    <input type='text' id='city'
                                           className='modal_info_input'
                                           value={userInfoToEdit.city}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, city: e.target.value})}/>
                                </div>

                                <div className='modal_info_row'>
                                    <label htmlFor='profession'>Profession:</label>
                                    <input type='text' id='profession'
                                           className='modal_info_input'
                                           value={userInfoToEdit.profession}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, profession: e.target.value})}/>
                                </div>

                                <div className='modal_info_row'>
                                    <label htmlFor='phonenumber'>Phone Number:</label>
                                    <input type='text' id='phonenumber'
                                           className='modal_info_input'
                                           value={userInfoToEdit.phonenumber}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, phonenumber: e.target.value})}/>
                                </div>

                                <div className='modal_info_row'>
                                    <label htmlFor='address'>Address:</label>
                                    <input type='text' id='address' 
                                           className='modal_info_input'
                                           value={userInfoToEdit.address}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, address: e.target.value})}/>
                                </div>

                                <div className='modal_info_row'>
                                    <label htmlFor='personalwebsite'>Personal WebSite:</label>
                                    <input type='text' id='personalwebsite'
                                           className='modal_info_input'
                                           value={userInfoToEdit.personalwebsite}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, personalwebsite: e.target.value})}/>
                                </div>

                                <div className='modal_info_row'>
                                    <label htmlFor='birthday'>Birthday:</label>
                                    <input type='text' id='birthday'
                                           className='modal_info_input'
                                           value={userInfoToEdit.birthday}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, birthday: e.target.value})}/>
                                </div>

                                <div className='modal_info_row'>
                                    <label htmlFor='gender'>Gender:</label>
                                    <input type='text' id='gender'
                                           className='modal_info_input'
                                           value={userInfoToEdit.gender}
                                           onChange={(e) => setUserInfoToEdit({...userInfoToEdit, gender: e.target.value})}/>
                                </div>

                            </div>

                            <div className='modalprofile_footer_container'>
                                <button className='modalprofile_close_button' onClick={closeModalToEdit}>Close</button>
                                
                                <button className='modalprofile_submit_button' type='button' onClick={handleSubmit}>Submit</button>
                            </div>

                        </div>

                    </ModalEditProfile>

                </div>

            </div>

        </div>

    )

}

export default Profile
