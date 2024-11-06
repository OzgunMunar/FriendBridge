import {useState, useEffect, useContext, useRef} from 'react'
import Post from '../Post/Post'

import "@/app/_styles/feedcontainer.css"
import PageLoader from '@/app/pageloader'
import ComponentWaiter from '@/app/componentwaiter'
import { GetProfileFeed } from '../FeedDbQueries/ProfileFeedQuery'
import { feedTypes } from '../FeedEnum/FeedEnum'
import { GetSavedPostsFeed } from '../FeedDbQueries/SavedPostsFeedQuery'
import { useFeedContext } from '../Contexts/FeedContext'

const Feed = ({ feedType, userId }) => {

    const { posts, getFeedPosts, loading, fetchError, setLoading, handleFetchError, lastAddedPost } = useFeedContext()
    const [waitingSeconds, setWaitingSeconds] = useState(3);

    useEffect(() => {

        setLoading(true)

        const fetchData = async () => {

            let feedData = []

            try {

                if(!userId) return

                switch (feedType) {

                    case feedTypes.ProfileFeed:

                        feedData = await GetProfileFeed(userId)

                    break;

                    case feedTypes.MainFeed:

                        // mainfeed query
                        
                    break;

                    case feedTypes.SavedPostsFeed:
                    
                        feedData = await GetSavedPostsFeed()

                    break;

                    case feedTypes.ProfileFeed:
                        
                        // profilefeed

                    break;

                    case feedTypes.ProfileFeed:
                        
                        // profilefeed

                    break;
                
                    default:
                        break;

                }

                getFeedPosts(feedData)

            } catch (error) {
                handleFetchError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [userId])
    
    useEffect(() => {

        let timer;
    
        if (fetchError) {

            timer = setInterval(() => {

                setWaitingSeconds(prev => {

                    if (prev > 1) {
                        return prev - 1
                    } else {
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
                            <div key={post._id} className={`${lastAddedPost === post._id ? 'blink':''}`} >
                                <Post post={post} />
                            </div>
                        ))

                )
                
            }
        </div>
    )

}

export default Feed