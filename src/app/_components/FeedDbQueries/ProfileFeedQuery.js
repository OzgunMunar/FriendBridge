import axios from "axios"

export const GetProfileFeed = async(userId, paginationInfo, setPagination, setRenderLoadDataButton) => {

    try {
        
        const resultPostRequest = await axios.post('/api/post', { userId, paginationInfo })
        const postDatas = resultPostRequest.data.posts

        const resultSavedPostRequest = await axios.post('/api/savedposts', { userId })
        let postDatasWithSavedPosts = []
        let savedPostDatas
        let isSavedByUser

        if (resultSavedPostRequest?.data?.savedPosts.postIds.length > 0) {

            savedPostDatas = resultSavedPostRequest.data.savedPosts.postIds

            for(let i=0; i < postDatas.length; i++) {

                isSavedByUser = savedPostDatas.some((post) => post._id === postDatas[i]._id);

                postDatasWithSavedPosts.push({
                    ...postDatas[i],
                    isSaved: isSavedByUser
                })

            }

        } else {

            postDatasWithSavedPosts = postDatas.map((postData) => {

                return {
                    ...postData,
                    isSaved: false
                }

            })
        
        }

        setPagination({
            page: resultPostRequest.data.pagination.page,
            limit: resultPostRequest.data.pagination.limit,
            totalPosts: resultPostRequest.data.pagination.totalPosts,
            totalPages: resultPostRequest.data.pagination.totalPages,
        })

        
        if (resultPostRequest.data.pagination.page === resultPostRequest.data.pagination.totalPages) {
            setRenderLoadDataButton(false)
        } 

        return postDatasWithSavedPosts

    } catch (error) {
        console.log(error.message)
    }

}