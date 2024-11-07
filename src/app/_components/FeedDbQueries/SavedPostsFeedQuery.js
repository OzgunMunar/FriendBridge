import axios from "axios"

export const GetSavedPostsFeed = async() => {

    try {
        
        const savedPostsByUser = await axios.get('/api/savedposts/')
        
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