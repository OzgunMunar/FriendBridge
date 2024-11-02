"use client"

import React from 'react'
import LoggedInLayout from '../_components/LoggedInLayout/LoggedInLayout'
import SavedPosts from '../_components/SavedPosts/SavedPosts'
import MainRightSide from '../_components/MainRightSide/MainRightSide'

const SavedPostsPage = () => {
  
    return (
        
        <LoggedInLayout>
            <SavedPosts />
            <MainRightSide />
        </LoggedInLayout>

  )

}

export default SavedPostsPage