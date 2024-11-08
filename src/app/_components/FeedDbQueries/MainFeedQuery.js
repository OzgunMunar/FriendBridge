import axios from "axios"

export const GetMainFeed = async(userId) => {

    try {
        
        // Fetches user's posts as well as user's he follows, mix and sort them by createdAt field
        const allPostsMixed = await axios.post(`/api/post/mainfeedposts`, { userId })

        console.log(allPostsMixed.data.data)
        
        return allPostsMixed.data.data

    } catch (error) {
        console.log(error.message)
    }

}