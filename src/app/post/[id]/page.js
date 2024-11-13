'use client'

import LoggedInLayout from "@/app/_components/LoggedInLayout/LoggedInLayout"
import SinglePostPage from "@/app/_components/SinglePost/SinglePostPage"

const SinglePost = () => {

    return (

        <LoggedInLayout>
            <SinglePostPage />
        </LoggedInLayout>
        
    )
}

export default SinglePost