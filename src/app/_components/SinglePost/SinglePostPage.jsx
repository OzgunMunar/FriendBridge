import { React, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import Post from "../Post/Post"
import { FeedProvider } from "../Contexts/FeedContext"
import PageLoader from "@/app/pageloader"
import '@/app/_styles/singlepost.css'

const SinglePostPage = () => {

    const pathName = usePathname()
    const postId = pathName.split("/")[2]

    const [post, setPost] = useState({})
    const [render, setRender] = useState(false)

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

    }, [render])

    useEffect(() => {

        const fetchData = async() => {
         
            if(!postId)
                return

            try {
            
                await axios.get(`/api/post/${postId}`)
                            .then((response) => {

                                const relatedPost = response.data.data
                                setPost(relatedPost)
                                setRender(true)

                            })
                            .catch((error) => {
                                
                                console.log(error.message)
                                toast.error("There has been an error while fetching post data.", { theme: "dark" })

                            })
                                                
            } catch (error) {
                console.log(error.message)
            }
            
        }
        
        fetchData()
        
    }, [postId])

    return (

        <div className="singlepost_container">
            {
                render ? (

                    <div className="singlepost_post">
                        <FeedProvider>
                            <Post post={post} isSinglePost={true} />
                        </FeedProvider>
                    </div>

                ) : <PageLoader />
            }

        </div>

    )

}

export default SinglePostPage