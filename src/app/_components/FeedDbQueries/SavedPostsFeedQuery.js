import axios from "axios"

export const GetSavedPostsFeed = async(userId, paginationInfo, setPagination, setRenderLoadDataButton) => {

    try {
        
        const savedPostsByUser = await axios.post('/api/savedposts', { userId, paginationInfo })

        let pageNumber = 0
        let totalPageNumber = 0
        
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

        pageNumber = savedPostsByUser.data.pagination.page
        totalPageNumber = savedPostsByUser.data.pagination.totalPages

        if(pageNumber === totalPageNumber) {
            setRenderLoadDataButton(false)
        }

        return savedPosts

    } catch (error) {
        console.log("SavedPostsFeedQuery.js: ", error.message)
    }

}