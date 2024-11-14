"use client"

import React from 'react'
import LoggedInLayout from '../_components/LoggedInLayout/LoggedInLayout'
import GlobalPosts from '../_components/GlobalPosts/GlobalPosts'

const GlobalPostsPage = () => {
  
    return (
        <LoggedInLayout>
            <GlobalPosts />
        </LoggedInLayout>
    )

}

export default GlobalPostsPage