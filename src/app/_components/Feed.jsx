import axios from 'axios'
import React from 'react'

const Feed = ({isRecordCreated}) => {

    const [posts, setPosts] = React.useState()

    const fetchData = async() => {

        try {
            
            const result = await axios.get('/api/post')
            const data = result.data.posts
            
            setPosts(data)
            
        } catch (error) {
            console.log(error);
        }

    }

    React.useEffect(() => {
        
        fetchData()
        
    },[isRecordCreated])

  return (
    <div>
        {posts?.map((post) => {

            return (
                <div key={post._id}>
                    <p>{post.post}</p>
                </div>
            )

        })}
    </div>
  )

}

export default Feed