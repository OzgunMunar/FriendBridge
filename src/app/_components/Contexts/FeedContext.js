import { createContext, useCallback, useContext, useState } from "react"

const FeedContext = createContext()

export const FeedProvider = ({ children }) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState(false)
    const [lastAddedPost, setLastAddedPost] = useState(null)

    const getFeedPosts = useCallback((feedPosts) => {
        setPosts(feedPosts)
    }, [])

    const addPost = useCallback((newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts])
        setLastAddedPost(newPost._id)
    }, [])

    const updatePost = useCallback((postId, postToEdit) => {

        const updatedPosts = posts.map(post =>

            post._id === postId ? { 
                ...post, 
                post: postToEdit.postText,
                imageUrlLink: postToEdit.imageUrlLink,
                location: postToEdit.location,
                friend: postToEdit.friend
            } 
            : post

        )

        setPosts(updatedPosts);

    }, [posts]);

    const addComments = useCallback((relatedPost) => {

        const updatedPosts = posts.map((post) => 
            post._id === relatedPost._id ? relatedPost : post
        )

        setPosts(updatedPosts)

    }, [posts])

    const handleFetchError = useCallback((error) => {
        setFetchError(true)
    }, [])

    const attachFeedPosts = useCallback((newFeedPosts) => {
        
        setPosts((oldFeedData) => [
            ...oldFeedData,
            ...newFeedPosts
        ])

    }, [])

    return (

        <FeedContext.Provider value={{ 
            posts, 
            addComments, 
            getFeedPosts, 
            updatePost, 
            addPost, 
            loading, 
            fetchError, 
            setLoading, 
            handleFetchError, 
            lastAddedPost, 
            attachFeedPosts 
            }}>

            { children }

        </FeedContext.Provider>

    )

}

export const useFeedContext = () => {
    return useContext(FeedContext)
} 