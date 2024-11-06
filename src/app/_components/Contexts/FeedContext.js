import { createContext, useCallback, useContext } from "react"

const FeedContext = createContext()


export const FeedProvider = ({ children }) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState(false)

    const setFeedPost = useCallback((feedPosts) => {
        setPosts(feedPosts)
    }, [])

    const addPost = useCallback((newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]); 
    }, [])

    const handleFetchError = useCallback((error) => {
        setFetchError(true)
        console.log(error)
    }, [])

    return (
        <FeedContext.Provider value={{ posts, setFeedPosts, addPost, loading, fetchError, setLoading, handleFetchError }}>
            {children}
        </FeedContext.Provider>
    )

}

export const useFeed = () => {
    return useContext(FeedContext)
} 