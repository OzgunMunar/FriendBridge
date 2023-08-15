import axios from 'axios'
import React from 'react'
import HorizontalLine from './HorizontalLine'

const Feed = () => {

    const [posts, setPosts] = React.useState()

    React.useEffect(() => {

        const fetchData = async() => {
            try {
            
                const result = await axios.get('/api/post')
                const data = result.data.posts

                setPosts(data)
                
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchData()
        
    },[])

  return (
    <div>
        {posts?.map((post) => {

            return (
                <div key={post._id}>
                <p>{post.post}</p>
                <HorizontalLine />
                </div>
            )

        })}
    </div>
  )

}

export default Feed