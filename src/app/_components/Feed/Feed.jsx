import axios from 'axios'
import {useState, useEffect, useContext, useRef} from 'react'
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

    const {shouldFeedChange, setShouldFeedChangeSwitch} = useContext(FeedContext)

    const fetchData = async() => {

        try {
            
            const result = await axios.get('/api/post')
            const data = result.data.posts

            setPosts(data)
 
        } catch (error) {
            setFetchError(true)
            console.log(error);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {

        fetchData()
        
    },[shouldFeedChange])

    useEffect(() => {

        let timer;
    
        if (fetchError) {

            timer = setInterval(() => {

                setWaitingSeconds(prev => {

                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        setShouldFeedChangeSwitch(val => !val);
                        return 3;
                    }
                });

            }, 1000);
        }
    
        return () => clearInterval(timer);

    }, [fetchError]);
    

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