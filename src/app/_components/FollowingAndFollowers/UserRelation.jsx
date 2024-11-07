import Link from 'next/link'
import React, { useState } from 'react'

const UserRelation = ({ unfollowUser, user }) => {
    
    const [fadeOut, setFadeOut] = useState(false)
    const [shouldRender, setShouldRender] = useState(true)

    const makePostDisappear = () => {

        setFadeOut(true)
        setTimeout(() => {
            setShouldRender(false)
        }, 250)

    }
  
    return (
        shouldRender ? (
        <div className={`followingandfollowers_userinfo ${fadeOut ? 'removeUserContainer':''}`}>

            <div className="followingandfollowers_userinfo_leftside">

                <div className="followingandfollowers_userinfo_leftside_img_container">
                    <Link href={`/${user.userCodeName}`}><img width={75} height={75} src={user.userImageLink} /></Link>
                </div>

                <div className="followingandfollowers_userinfo_leftside_text">
                    <span><Link href={`/${user.userCodeName}`}>{user.username}</Link></span>
                    <span><Link href={`/${user.userCodeName}`}>{`@`+user.userCodeName}</Link></span>
                    <span>{user.profession}</span>
                </div>

            </div>

            <div className="profile_top_profilebutton_container bg-red-300 hover:bg-red-400 border-red-400" 
                onClick={ () => { 

                    unfollowUser(user.userCodeName) 
                    makePostDisappear(false)

                }}>

                <button className="profile_top_button"> 
                    <img width="25" height="25" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
                    Unfollow
                </button>

            </div>

        </div>) : null

    )
}

export default UserRelation