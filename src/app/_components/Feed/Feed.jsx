import {useState, useEffect, useContext, useRef} from 'react'
import Post from '../Post/Post'

import "@/app/_styles/feedcontainer.css"
import PageLoader from '@/app/pageloader'
import ComponentWaiter from '@/app/componentwaiter'
import { GetProfileFeed } from '../FeedDbQueries/ProfileFeedQuery'
import { feedTypes } from '../FeedEnum/FeedEnum'
import { GetSavedPostsFeed } from '../FeedDbQueries/SavedPostsFeedQuery'
import { useFeedContext } from '../Contexts/FeedContext'
import { GetMainFeed } from '../FeedDbQueries/MainFeedQuery'

const Feed = ({ feedType, userId }) => {

    const { posts, getFeedPosts, loading, fetchError, setLoading, handleFetchError, lastAddedPost } = useFeedContext()
    const [ waitingSeconds, setWaitingSeconds ] = useState(3);

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

                        feedData = await GetMainFeed()
                        
                    break;

                    case feedTypes.SavedPostsFeed:
                    
                        feedData = await GetSavedPostsFeed()

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

    const renderNoPostsMessage = () => {

        if (userId) {

            if (feedType === feedTypes.SavedPostsFeed) {

                return (
                    <div className="flex items-center justify-center mt-6 py-5 flex-col gap-5 border border-yellow-300 bg-yellow-100 text-orange-700">
                        <img width="48" height="48" src="https://img.icons8.com/color/48/general-warning-sign.png" alt="general-warning-sign"/>
                        <p>There are no saved posts. To save one, click on the &quot;...&quot; button < br/>at the top-right of any post and select &quot;Save Post&quot;.</p>
                    </div>
                )

            } else if (feedType === feedTypes.MainFeed) {

                return (
                    <div className="flex items-center justify-center mt-6 py-5 flex-col gap-5 border border-yellow-300 bg-yellow-100 text-orange-700">
                        <img width="48" height="48" src="https://img.icons8.com/color/48/general-warning-sign.png" alt="general-warning-sign"/>
                        <p>There are no post to show. In main feed, user sees his/her posts <br />mixed with the users he/she follows. Please follow others or share your thoughts.</p>
                    </div>
                )

            } else if (feedType === feedTypes.ProfileFeed) {

                return (
                    <div className="flex items-center justify-center mt-6 py-5 flex-col gap-5 border border-yellow-300 bg-yellow-100 text-orange-700">
                        <img width="48" height="48" src="https://img.icons8.com/color/48/general-warning-sign.png" alt="general-warning-sign"/>
                        <p>There are no post to show. You might consider <br />sharing your thoughts with others.</p>
                    </div>
                )

            } else {

                return null

            } 

        }

    }

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
                        (
                            posts.length !== 0 ? (

                                posts?.map((post) => (
                                    <div key={post._id} className={`${lastAddedPost === post._id ? 'blink':""}`} >
                                        <Post post={post} />
                                    </div>
                                ))

                            ) : (
                                renderNoPostsMessage()
                            )

                        )

                )
                
            }
        </div>
    )

}

export default Feed