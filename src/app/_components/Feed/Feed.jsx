import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import Post from '../Post/Post'

import "@/app/_styles/feedcontainer.css"
import { FeedChangeContext } from '../Contexts/Contexts'

const Feed = () => {

    const [posts, setPosts] = useState()

    const {shouldFeedChange} = useContext(FeedChangeContext)

    const fetchData = async() => {

        try {
            
            const result = await axios.get('/api/post')
            const data = result.data.posts

            setPosts(data)
            
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        
        fetchData()
        
    },[shouldFeedChange])

    return (
        <div className="feed_container">
            {posts?.map((post) => {
                return (
                    <div key={post._id}>
                        <Post post={post}/>
                    </div>
                )
            })}
        </div>
    )

}

export default Feed