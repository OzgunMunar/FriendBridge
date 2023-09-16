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

                <span className='profile_username'>{user.username}</span>
                <span className='profile_email'>{user.email}</span>

            </div>

            <Toaster position="top-right" reverseOrder={false}/>

        </Fragment>

    )

}

export default Profile