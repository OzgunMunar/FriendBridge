import axios from "axios"

export const GetProfileFeed = async(userId) => {

    try {
        
        const resultPostRequest = await axios.get(`/api/post?userId=${userId}`)
        const postDatas = resultPostRequest.data.posts

        const resultSavedPostRequest = await axios.get('/api/savedposts')
        let postDatasWithSavedPosts = []
        let savedPostDatas 
        let isSavedByUser

        if(resultSavedPostRequest.data.savedPosts.postIds.length > 0) {

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

        return postDatasWithSavedPosts

    } catch (error) {
        console.log(error.message)
    }

}