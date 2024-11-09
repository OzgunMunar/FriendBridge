import axios from "axios"

export const GetMainFeed = async(userId, paginationInfo, setPagination) => {

    try {
        
        // Fetches user's posts as well as user's he follows, mix and sort them by createdAt field
        const allPostsMixed = await axios.post(`/api/post/mainfeedposts`, { userId, paginationInfo })
        
        // console.log(allPostsMixed.data.pagination)

        setPagination({
            page: allPostsMixed.data.pagination.page,
            limit: allPostsMixed.data.pagination.limit,
            totalPosts: allPostsMixed.data.pagination.totalPosts,
            totalPages: allPostsMixed.data.pagination.totalPages,
        })

        return allPostsMixed.data.data

    } catch (error) {
        console.log(error.message)
    }

}