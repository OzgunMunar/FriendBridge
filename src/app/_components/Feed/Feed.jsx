import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import Post from '../Post/Post'

import "@/app/_styles/feedcontainer.css"
import { FeedContext } from '../Contexts/Contexts'
import PageLoader from '@/app/pageloader'
import ComponentWaiter from '@/app/componentwaiter'

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState(false)
    const [waitingSeconds, setWaitingSeconds] = useState(3);

    const { shouldFeedChange, setShouldFeedChangeSwitch, userId } = useContext(FeedContext)

    useEffect(() => {

        const fetchData = async () => {
            
            if(!userId) 
                return

            try {

                const resultPostRequest = await axios.get(`/api/post?userId=${userId}`)
                const postDatas = resultPostRequest.data.posts

                const resultSavedPostRequest = await axios.get('/api/savedposts')
                let postDatasWithSavedPosts = []
                let savedPostDatas 
                let isSavedByUser

                if(resultSavedPostRequest.data.savedPosts.postIds.length > 0) {

                    savedPostDatas = resultSavedPostRequest.data.savedPosts.postIds

                    for(let i=0; i < postDatas.length; i++) {

                        isSavedByUser = savedPostDatas.some((post) => post._id === postDatas[i]._id);

                        postDatasWithSavedPosts.push({
                            ...postDatas[i],
                            isSaved: isSavedByUser
                        });
                    

                        console.log(postDatasWithSavedPosts)

                    }

                } else {
                    
                    postDatasWithSavedPosts = postDatas.map((postData) => {
                        
                        return {
                            ...postData,
                            isSaved: false
                        }

                    })

                }

                setPosts(postDatasWithSavedPosts)

            } catch (error) {
                setFetchError(true)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [shouldFeedChange, userId])
    
    useEffect(() => {

        let timer;
    
        if (fetchError) {

            timer = setInterval(() => {

                setWaitingSeconds(prev => {

                    if (prev > 1) {
                        return prev - 1
                    } else {
                        setShouldFeedChangeSwitch(val => !val)
                        return 3
                    }
                })

            }, 1000)
            
        }
    
        return () => clearInterval(timer)

    }, [fetchError])

    return (
        <div className="feed_container">
            {
                fetchError ? (

                    <div className="fetch-error-container">

                        <ComponentWaiter />
                        <p>An error occured while fetching posts.</p>
                        <p>Please refresh the page or it will refreshed in { waitingSeconds } seconds automatically.</p>

                    </div>

                ) : (

                    loading ?
                        <PageLoader />
                        :
                        posts.map((post) => (
                            <div key={post._id}>
                                <Post post={post} />
                            </div>
                        ))

                )
                
            }
        </div>
    )

}

export default Feed