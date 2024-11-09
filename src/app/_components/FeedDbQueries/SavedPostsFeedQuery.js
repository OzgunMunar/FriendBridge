import axios from "axios"

export const GetSavedPostsFeed = async(userId, paginationInfo, setPagination, setRenderLoadDataButton) => {

    try {
        
        const savedPostsByUser = await axios.post('/api/savedposts/paginated', { userId, paginationInfo })
        
        const savedPosts = savedPostsByUser?.data?.savedPosts?.postIds?.map((post) => {
            return ({
                ...post,
                isSaved: true
            })    
        })

        setPagination({
            page: savedPostsByUser.data.pagination.page,
            limit: savedPostsByUser.data.pagination.limit,
            totalPosts: savedPostsByUser.data.pagination.totalPosts,
            totalPages: savedPostsByUser.data.pagination.totalPages,
        })

        if (savedPostsByUser.data.pagination.page === savedPostsByUser.data.pagination.totalPages) {
            setRenderLoadDataButton(false)
        } 

        return savedPosts

    } catch (error) {
        console.log("SavedPostsFeedQuery.js: ", error.message)
    }

}