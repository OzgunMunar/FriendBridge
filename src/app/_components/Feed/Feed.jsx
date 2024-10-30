import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import Post from '../Post/Post'

import "@/app/_styles/feedcontainer.css"
import { FeedChangeContext } from '../Contexts/Contexts'
import PageLoader from '@/app/pageloader'

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const {shouldFeedChange} = useContext(FeedChangeContext)

    const fetchData = async() => {

        setLoading(true)

        try {
            
            const result = await axios.get('/api/post')
            const data = result.data.posts

            setPosts(data)
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        fetchData()
        
    },[shouldFeedChange])

    return (
        <div className="feed_container">
            {
                loading ?
                    <PageLoader />
                    :
                    posts.map((post) => (
                        <div key={post._id}>
                            <Post post={post} />
                        </div>
                    ))
                
            }
        </div>
    )

}

export default Feed