import React, { useState, useContext, useEffect, useRef, useReducer  } from 'react'
import axios from "axios"
import { PageLoaderContext } from '../Contexts/Contexts'
import Feed from '../Feed/Feed'
import ModalEditProfile from '../Modals/ModalEditProfile'
import { toast } from "react-toastify";
import CreatePost from '../Post/CreatePost'
import { usePathname } from 'next/navigation'
import { feedTypes } from '../FeedEnum/FeedEnum'
import { FeedProvider } from '../Contexts/FeedContext'
import { useUserContext } from '../Contexts/UserContext'
import { INITIAL_STATE, profileTabsReducer } from '@/app/reducers/profileTabsReducer'
import FollowingAndFollowers from '../FollowingAndFollowers/FollowingAndFollowers'
import '@/app/_styles/newprofile.css'
import '@/app/_styles/skeletonloader.css'

const Profile = () => {

    const { user, updateUser, updateUsersFollowingStatus } = useUserContext()
    const { setLoader } = useContext(PageLoaderContext)

    const pathName = usePathname()
    const userCodeName = pathName?.split('/')[1]

    const [isModalShow, setModalShow] = useState(false)
    const [isPasswordMailSent, setIsPasswordMailSent] = useState(false)
    const [viewUser, setViewUser] = useState('')
    const [isLoggedInProfile, setIsLoggedInProfile] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const [followingProcess, setFollowingProcess] = useState(false)
    const [shouldRenderButton, setShouldRenderButton] = useState(false)

    const [state, dispatch] = useReducer(profileTabsReducer, INITIAL_STATE)

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
                    setShouldRenderButton(true)

                } else {
                    
                    const userData = await axios.get(`/api/users/${userCodeName}`)

                    if(userData.data.data.followedBy.includes(user._id)) {

                        setIsFollowing(true)

                    }

                    setViewUser(userData.data.data)
                    setIsLoggedInProfile(false)
                    setShouldRenderButton(true)

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
    }

    const closeModalToEdit = () => {
        setModalShow(false)
    }

    const changePassword = async() => {

        try {

            await axios.post('/api/users/sendmailofchangepassword')
            toast.success("Email sent to change password.", { theme: "light" })
            setIsPasswordMailSent(true)

        } catch (error) {
            console.log(error.message)
            toast.error(error, { theme: "dark" })
            setIsPasswordMailSent(false)
        }
    }

    const handleSubmit = async() => {

        try {

            await axios.post("/api/users/updateuserinfo", userInfo)
                                        .then((response) => {

                                            const updatedUserInfo = response.data.data
                                            toast.success("User updated.", { theme: "light" })
                                
                                            updateUser(updatedUserInfo)

                                        }).catch((error) => {

                                            console.log(error.message)
                                            toast.error("There's been an error while updating the user.", { theme: "dark" })

                                        }).finally(() => {

                                            setModalShow(false)

                                        })
            
        } catch (error) {
            toast.error(error.response.data.message, { theme: "dark" })
        }

    }
    
    const followUser = async() => {

        const matcherCodeName = userCodeName
        const userId = user._id
        
        let loggedinuser = ''

        setFollowingProcess(true)
        await axios.post('/api/users/followuser', { userId, matcherCodeName })
                                    .then((response) => {

                                        toast.info("You are following the user.", { theme: "light" })
                                        setIsFollowing(true)

                                        loggedinuser = response.data
                                        updateUsersFollowingStatus(loggedinuser)

                                    })
                                    .catch((error) => {

                                        toast.error("There has been an error.", { theme: "dark" })
                                        console.log(error.message)

                                    }).finally(() => {

                                        setFollowingProcess(false)

                                    })
        
    }

    const unfollowUser = async(userCodeName) => {

        const matcherCodeName = userCodeName
        const userId = user._id

        let loggedinuser = ""

        setFollowingProcess(true)
        await axios.post('/api/users/unfollowuser', { userId, matcherCodeName })
                                    .then((response) => {

                                        toast.info("You unfollowed the user.", { theme: "light" })
                                        setIsFollowing(false)

                                        loggedinuser = response.data
                                        updateUsersFollowingStatus(loggedinuser)

                                    })
                                    .catch((error) => {

                                        toast.error("There has been an error.", { theme: "dark" })
                                        console.log(error.message)

                                    }).finally(() => {

                                        setFollowingProcess(false)

                                    })

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

                        <button className={`profile_top_profilepages_button ${state.posts ? "active":""}`} onClick={() => { dispatch({ type: "onPosts" }) }}>
                            <span className="profile_top_profilepages_title">Posts</span>
                            <span className="profile_top_profilepages_number">{viewUser?.postNumber || 0}</span>
                        </button>

                        <button className={`profile_top_profilepages_button ${state.followingPeople ? "active":""}`} onClick={() => { dispatch({ type: "onFollowingPeople" }) }}>
                            <span className="profile_top_profilepages_title">Following</span>
                            <span className="profile_top_profilepages_number">{viewUser?.followingPeople?.length || 0}</span>
                        </button>

                        <button className={`profile_top_profilepages_button ${state.followedPeople ? "active":""}`} onClick={() => { dispatch({ type: "onFollowedPeople" }) }}>
                            <span className="profile_top_profilepages_title">Followers</span>
                            <span className="profile_top_profilepages_number">{viewUser?.followedBy?.length || 0}</span>
                        </button>
        
                    </div>

                    {
                        shouldRenderButton ? (
                            (isLoggedInProfile) ? (

                                <div className="profile_top_profilebutton_container bg-slate-300 hover:bg-slate-400 border-slate-400">
                    
                                    <button type='button' className="profile_top_button" onClick={openModalToEdit}>
                                        <img width="30" height="30" src="https://img.icons8.com/color/48/map-editing.png" alt="map-editing" />
                                        <span className="text-white">Edit Profile</span>
                                    </button>

                            </div>

                        )
                        :
                        (
                            (isFollowing ? (

                                    <div className="profile_top_profilebutton_container bg-red-300 hover:bg-red-400 border-red-400">

                                        <button type='button' className="profile_top_button" onClick={() => unfollowUser(viewUser.userCodeName)} disabled={followingProcess}>
                                            <img width="25" height="25" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                                            {followingProcess ? "Unfollowing..." : "Unfollow"}
                                        </button>

                                    </div>

                                )
                                :
                                (

                                    <div className="profile_top_profilebutton_container bg-green-300 hover:bg-green-400 border-green-400" disabled={followingProcess}>

                                        <button type='button' className="profile_top_button" onClick={() => followUser()}>
                                            <img width="25" height="25" src="https://img.icons8.com/ios/50/checkmark--v1.png" alt="checkmark--v1"/>
                                            {followingProcess ? "Following..." : "Follow"}
                                        </button>

                                    </div>

                                )
                            )
                        )) : null
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

                <div className="profile_below_tab_container">

                    {
                        state.posts ? 

                        (

                            <FeedProvider>

                                {

                                    (userCodeName === user.userCodeName) ? (<><CreatePost postType={'FeedPost'} /> <div className='my-5'></div></>):(<div className='border-t border-t-2 border-t-blue-700'></div>)

                                }

                                <Feed feedType={feedTypes.ProfileFeed} userId={viewUser._id} />

                            </FeedProvider>
                            
                        ) : null

                    }

                    {

                        state.followingPeople ? 

                        (

                            <FollowingAndFollowers relationType={"Following"} unfollowUser={unfollowUser} userId={viewUser._id} />
                            
                        ) : null

                    }

                    {
                    
                        state.followedPeople ? 
                    
                        (

                            <FollowingAndFollowers relationType={"Follower"} followUser={followUser} userId={viewUser._id} />

                        ) : null

                    }

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