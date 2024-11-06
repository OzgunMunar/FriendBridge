import React, { useState, useContext, useEffect, useRef  } from 'react'
import axios from "axios"
import { UserContext, PageLoaderContext } from '../Contexts/Contexts'
import Feed from '../Feed/Feed'
import ModalEditProfile from '../Modals/ModalEditProfile'
import '@/app/_styles/newprofile.css'
import '@/app/_styles/skeletonloader.css'
import { toast } from "react-toastify";
import CreatePost from '../Post/CreatePost'
import { usePathname } from 'next/navigation'
import { feedTypes } from '../FeedEnum/FeedEnum'
import { FeedProvider } from '../Contexts/FeedContext'

const Profile = () => {

    const { user, setUserInfoRefreshSwitch } = useContext(UserContext)
    const { setLoader } = useContext(PageLoaderContext)

    const pathName = usePathname()
    const userCodeName = pathName?.split('/')[1]

    const [isModalShow, setModalShow] = useState(false)
    const [isPasswordMailSent, setIsPasswordMailSent] = useState(false)
    const [viewUser, setViewUser] = useState('')
    const [isLoggedInProfile, setIsLoggedInProfile] = useState(false)

    const usernameRef = useRef(null)

    const [userInfo, setUserInfo] = useState({

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

        setUserInfo({

            username: user?.username || '',
            userImageLink: user?.userImageLink || '',
            address: user?.address || '',
            personalwebsite: user?.personalwebsite || '',
            phonenumber: user?.phonenumber || '',
            profession: user?.profession || '',
            birthday: user?.birthday || '',
            gender: user?.gender || ''
    
        })

        const fetchData = async() => {
            
            if(user.userCodeName) {
                
                if(userCodeName === user.userCodeName) {
                    
                    setViewUser(user)
                    setIsLoggedInProfile(true)

                } else {
                    
                    const userData = await axios.get(`/api/users/${userCodeName}`)
                    setViewUser(userData.data.data)
                    setIsLoggedInProfile(false)

                }

            }

        }

        fetchData()
        setLoader(false)

    }, [user])

    useEffect(() => {

        if (isModalShow === true) 
            usernameRef.current.focus()

    },[isModalShow])

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

    const unfollowUser = async() => {

        // await axios.get('/api/user/followuser')

    }

    return (

        <div className="profile_container">
            
            <div className="profile_top_section">

                <div className="profile_top_container_one">
                    
                    <div className="profile_top_userimage_container">
                        <img src={viewUser?.userImageLink || ""} className="profile_top_userimage skeleton" />
                    </div>
                    
                    <div className='profile_top_user_info'>

                        <span className={`profile_username mb-0.5 ${viewUser?.username ? '' : 'skeleton skeleton-title'}`}> 
                            {viewUser?.username || ""} 
                        </span>

                        <span className={`cursor_pointer text-slate-500 ${viewUser?.userCodeName ? '' : 'skeleton skeleton-text'}`}> 
                            {viewUser?.userCodeName ? `@${viewUser.userCodeName}` : ""} 
                        </span>

                    </div>

                </div>

                <div className="profile_top_container_two">

                    <div className="profile_top_profilepages">

                        <button className="profile_top_profilepages_button active">
                            <span className="profile_top_profilepages_title">Posts</span>
                            <span className="profile_top_profilepages_number">{viewUser?.postNumber || 0}</span>
                        </button>

                        <button className="profile_top_profilepages_button">
                            <span className="profile_top_profilepages_title">Following</span>
                            <span className="profile_top_profilepages_number">{viewUser?.followingPeople?.length || 0}</span>
                        </button>

                        <button className="profile_top_profilepages_button">
                            <span className="profile_top_profilepages_title">Followers</span>
                            <span className="profile_top_profilepages_number">{viewUser?.followedBy?.length || 0}</span>
                        </button>
        
                        <button className="profile_top_profilepages_button">
                            <span className="profile_top_profilepages_title">Likes</span>
                            <span className="profile_top_profilepages_number">{viewUser?.userlikeNumber || 0}</span>
                        </button>
        
                    </div>

                    {
                        (isLoggedInProfile) ? (

                            <div className="profile_top_profilebutton_container bg-slate-400 hover:bg-slate-500 border-slate-500">
                    
                                <button type='button' className="profile_top_button" onClick={openModalToEdit}>
                                    <img width="30" height="30" src="https://img.icons8.com/color/48/map-editing.png" alt="map-editing" />
                                    <span className="text-white">Edit Profile</span>
                                </button>

                            </div>

                        )
                        :
                        (
                            // // If user is not following...
                            // <div className="profile_top_profilebutton_container bg-red-400 hover:bg-red-500 border-red-500">

                            //     <button type='button' className="profile_top_button" onClick={() => unfollowUser()}>
                            //         <img width="25" height="25" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                            //         Unfollow
                            //     </button>

                            // </div>

                            // If user is following...
                            <div className="profile_top_profilebutton_container bg-green-400 hover:bg-green-500 border-green-500">

                                <button type='button' className="profile_top_button" onClick={() => unfollowUser()}>
                                    <img width="25" height="25" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                                    Follow
                                </button>

                            </div>
                        )
                    }

                </div>

            </div>

            <div className="profile_below_section">

                <div className="profile_below_about_section">

                    <div className='profile_personal_info'>

                        <div className='profile_personal_info_toprow'>

                            <span className={`profile_username ${viewUser?.username ? '' : 'skeleton skeleton-title'}`}> 
                                {viewUser?.username || ""} 
                            </span>

                            <p className={`cursor_pointer text-slate-500 ${viewUser?.userCodeName ? '' : 'skeleton skeleton-text'}`}> 
                                {viewUser?.userCodeName ? `@${viewUser.userCodeName}` : ""} 
                            </p>

                        </div>
                    
                        <div className='profile_personal_info_belowrow'>
                        
                            <div className='row'>
                                <div className='profile_personal_info_title'>
                                    <img width="20" height="20" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-job-job-search-flaticons-lineal-color-flat-icons-3.png" alt="external-job-job-search-flaticons-lineal-color-flat-icons-3"/>
                                </div>
                                <span className={`profile_personal_info_value ${viewUser?.profession ? '' : 'skeleton skeleton-text'}`}> 
                                    {viewUser?.profession || ""} 
                                </span>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/doodle/48/phone--v1.png" alt="phone--v1"/>
                                </div>
                                <span className={`profile_personal_info_value text-sky-600 ${viewUser?.phonenumber ? '' : 'skeleton skeleton-text'}`}> 
                                    <a href={`tel:${viewUser?.phonenumber}`}>
                                        {viewUser?.phonenumber || ""}
                                    </a>
                                </span>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/plasticine/100/home.png" alt="home"/>
                                </div>
                                <span className={`profile_personal_info_value ${viewUser?.address ? '' : 'skeleton skeleton-text'}`}> 
                                    {viewUser?.address || ""} 
                                </span>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/fluency/48/mail--v1.png" alt="mail--v1"/>
                                </div>
                                <span className={`profile_personal_info_value text-sky-600 ${viewUser?.email ? '' : 'skeleton skeleton-text'}`}> 
                                    <a href={`mailto:${viewUser?.email}`}>
                                        {viewUser?.email || ""}
                                    </a>
                                </span>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/color/48/domain--v1.png" alt="domain--v1"/>
                                </div>
                                <span className={`profile_personal_info_value text-sky-600 ${viewUser?.personalwebsite ? '' : 'skeleton skeleton-text'}`}> 
                                    <a href={`${viewUser?.personalwebsite}`} target='_blank'>
                                        {viewUser?.personalwebsite || ""}
                                    </a>
                                </span>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title mt-0.5'>
                                    <img width="20" height="20" src="https://img.icons8.com/fluency/48/birthday.png" alt="birthday"/>
                                </div>
                                <span className={`profile_personal_info_value ${viewUser?.birthday ? '' : 'skeleton skeleton-text'}`}> 
                                    {viewUser?.birthday || ""} 
                                </span>
                            </div>

                            <div className='row'>
                                <div className='profile_personal_info_title'>
                                    <img width="20" height="20" src="https://img.icons8.com/dusk/64/gender.png" alt="gender"/>
                                </div>
                                <span className={`profile_personal_info_value ${viewUser?.gender ? '' : 'skeleton skeleton-text'}`}> 
                                    {viewUser?.gender || ""} 
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="profile_below_feed_container">

                    <FeedProvider>

                        {

                            (userCodeName === user.userCodeName) ? (<><CreatePost postType={'FeedPost'} /> <div className='my-5'></div></>):(<div className='border-t border-t-2 border-t-blue-700'></div>)

                        }

                        <Feed feedType={feedTypes.ProfileFeed} userId={viewUser._id} />

                    </FeedProvider>

                </div>

            </div>

            <div className='modal-code'>

                <div className={`${isModalShow === true ? "modal-container active":"modal-container"}`}>

                    <ModalEditProfile usernameRef={usernameRef} 
                                      userInfo={userInfo} 
                                      isOpen={isModalShow} 
                                      onClose={closeModalToEdit} 
                                      handleSubmit={handleSubmit} 
                                      setuserInfo={setUserInfo} 
                                      isPasswordMailSent={isPasswordMailSent}
                                      changePassword={changePassword}
                                      />

                </div>

            </div>

        </div>

    )

}

export default Profile