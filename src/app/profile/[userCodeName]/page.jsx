'use client'

import LoggedInLayout from "@/app/_components/LoggedInLayout/LoggedInLayout"
import Profile from "@/app/_components/Profile/Profile"



const ProfilePage = () => {

    return (

        <LoggedInLayout>
            <Profile/>
        </LoggedInLayout>
        
    )
}

export default ProfilePage