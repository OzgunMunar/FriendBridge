import axios from "axios"

export const GetSavedPostsFeed = async(userId) => {

    try {
        
        const savedPostsByUser = await axios.post('/api/savedposts', { userId })
        
        const savedPosts = savedPostsByUser?.data?.savedPosts?.postIds?.map((post) => {
            return ({
                ...post,
                isSaved: true
            })    
        })

        return savedPosts

    } catch (error) {
        console.log("SavedPostsFeedQuery.js: ", error.message)
    }

}