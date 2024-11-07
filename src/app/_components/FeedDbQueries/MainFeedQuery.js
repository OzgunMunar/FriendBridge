import axios from "axios"

export const GetMainFeed = async() => {

    try {
        
        // Fetches user's posts as well as user's he follows, mix and sort them by createdAt field
        const allPostsMixed = await axios.get(`/api/post/mainfeedposts`)
        
        return allPostsMixed.data.data

    } catch (error) {
        console.log(error.message)
    }

}