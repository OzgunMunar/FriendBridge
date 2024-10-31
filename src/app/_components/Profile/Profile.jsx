import React, { useState, useContext, useEffect, useRef  } from 'react'
import axios from "axios"
import { UserContext, FeedContext, PageContext, PageLoaderContext } from '../Contexts/Contexts'
import Feed from '../Feed/Feed'
import ModalEditProfile from '../Modals/ModalEditProfile'
import '@/app/_styles/newprofile.css'
import { toast } from "react-toastify";
import CreatePost from '../Post/CreatePost'

const Profile = () => {

    const { user, setUserInfoRefreshSwitch } = useContext(UserContext)
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

    },[isModalShow])

    useEffect(() => {
        setUserInfoRefreshSwitch(val => !val)
    },[shouldFeedChange])

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

    console.log('profile re-rendered')

    return (

        <div className="profile_container">
            
            <div className="profile_top_section">

                <div className="profile_top_container_one">
                    
                    <div className="profile_top_userimage_container">
                        <img src={user.userImageLink} className="profile_top_userimage" />
                    </div>
                    
                    <div className='profile_top_user_info'>

                        <span className='profile_username'>{userInfo.username}</span>
                        <span className='cursor_pointer text-slate-500'>{`@${user.userCodeName}`}</span>

                    </div>

                </div>

                <div className="profile_top_container_two">

                    <div className="profile_top_profilepages">

                        <button className="profile_top_profilepages_button active">
                            <span className="profile_top_profilepages_title">Posts</span>
                            <span className="profile_top_profilepages_number">{user.postNumber || 0}</span>
                        </button>

                        <button className="profile_top_profilepages_button">
                            <span className="profile_top_profilepages_title">Following</span>
                            <span className="profile_top_profilepages_number">{user.followingPeople?.length}</span>
                        </button>

                        <button className="profile_top_profilepages_button">
                            <span className="profile_top_profilepages_title">Followers</span>
                            <span className="profile_top_profilepages_number">{user.followedBy?.length}</span>
                        </button>
        
                        <button className="profile_top_profilepages_button">
                            <span className="profile_top_profilepages_title">Likes</span>
                            <span className="profile_top_profilepages_number">{user.userlikeNumber}</span>
                        </button>
        
                    </div>
        
                    <div className='profile_top_editprofilebutton_container'>
        
                        <button type='button' className='profile_top_edit_button' onClick={openModalToEdit}>
                            <img width="30" height="30" src="https://img.icons8.com/color/48/map-editing.png" alt="map-editing"/>
                            Edit Profile
                        </button>
        
                    </div>

                </div>

            </div>

            <div className="profile_below_section">

                <div className="profile_below_about_section">

                    <div className='profile_personal_info'>

                        <div className='profile_personal_info_toprow'>

                            <span className='profile_username'>{userInfo.username}</span>
                            <p className='cursor_pointer text-slate-500'>{`@${userInfo.username.replace(/\s+/g, "").toLowerCase()}`}</p>

                        </div>
                    
                        <div className='profile_personal_info_belowrow'>
                        
                            <div className='row'>
                                <div className='profile_personal_info_title'>
                                    <img width="20" height="20" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-job-job-search-flaticons-lineal-color-flat-icons-3.png" alt="external-job-job-search-flaticons-lineal-color-flat-icons-3"/>
                                </div>
                                <div className='profile_personal_info_value'>{userInfo.profession}</div>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/doodle/48/phone--v1.png" alt="phone--v1"/>
                                </div>
                                <div className='profile_personal_info_value text-sky-600'>
                                    <a href={`tel:${userInfo.phonenumber}`}>
                                        {userInfo.phonenumber}
                                    </a>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/plasticine/100/home.png" alt="home"/>
                                </div>
                                <div className='profile_personal_info_value'>{userInfo.address}</div>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/fluency/48/mail--v1.png" alt="mail--v1"/>
                                </div>
                                <div className='profile_personal_info_value text-sky-600'>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/color/48/domain--v1.png" alt="domain--v1"/>
                                </div>
                                <div className='profile_personal_info_value text-sky-600 website-text'>
                                    <a href={`${userInfo.personalwebsite}`} target='_blank'>
                                        { userInfo.personalwebsite }
                                    </a>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/fluency/48/birthday.png" alt="birthday"/>
                                </div>
                                <div className='profile_personal_info_value'>{ userInfo.birthday ? userInfo.birthday : "unshared" }</div>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title'>
                                    <img width="20" height="20" src="https://img.icons8.com/dusk/64/gender.png" alt="gender"/>
                                </div>
                                <div className='profile_personal_info_value'>{userInfo.gender}</div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="profile_below_feed_container">
            
                    <FeedContext.Provider value={{ shouldFeedChange, setShouldFeedChangeSwitch, postType: 'FeedPost' }}>
                        <CreatePost />
                        <div className='my-5'></div>
                        <Feed />
                    </FeedContext.Provider>

                </div>

            </div>

            <div className='modal-code'>

                <div className={`${isModalShow === true ? "modal-container active":"modal-container"}`}>

                    <ModalEditProfile usernameRef={usernameRef} 
                                      userInfo={userInfo} 
                                      isOpen={isModalShow} 
                                      onClose={closeModalToEdit} 
                                      handleSubmit={handleSubmit} 
                                      setuserInfo={setuserInfo} 
                                      isPasswordMailSent={isPasswordMailSent}
                                      changePassword={changePassword}
                                      />

                </div>

            </div>

        </div>

    )

}

export default Profile