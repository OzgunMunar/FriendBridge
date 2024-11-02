import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SavedPosts = () => {

    const [savedPosts, setSavedPosts] = useState('')

    useEffect(() => {

        const fetchData = async() => {

            const savedPostData = await axios.get('/api/savedposts')
            console.log(savedPostData.data.savedPosts)

        }

        fetchData()

    },[])

    return (

        <div className='h-screen w-screen flex items-center justify-center flex-col bg-red-300'>

            Some dummy text

        </div>

    )

}

export default SavedPosts