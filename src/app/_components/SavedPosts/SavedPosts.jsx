import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Contexts/Contexts'
import Feed from '../Feed/Feed'
import { feedTypes } from '../FeedEnum/FeedEnum'
import { FeedProvider } from '../Contexts/FeedContext'

const SavedPosts = () => {

    const { user } = useContext(UserContext)

    return (

        <div className='body_sections'>

            <div className='left_sidebar_emptiness'/>

            <div className='posts_section'>

                <div className='w-full border-t border-t-2 border-t-orange-700 bg-white flex items-center justify-center gap-2 text-xl py-2'>
                    <img width="20" height="20" src="https://img.icons8.com/office/40/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1"/>
                    <span>Saved Posts</span>
                </div>

                <FeedProvider>
                    <Feed feedType={feedTypes.SavedPostsFeed} userId={user._id} />
                </FeedProvider>

            </div>

            <div className='.right_sidebar_emptiness'/>

        </div>

    )

}

export default SavedPosts