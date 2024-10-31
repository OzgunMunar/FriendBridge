'use client'

import PostForm from "./PostForm"
import { useState, useRef, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { FeedContext } from "../Contexts/Contexts";
import "@/app/_styles/createpost.css"
import { toast } from "react-toastify";


const CreatePost = () => {

  const router = useRouter()
  const pathName = usePathname()
  const textAreaRef = useRef()

  const { setShouldFeedChangeSwitch, postType } = useContext(FeedContext)

  const [activePathName, setActivePathName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    
    postText: "",
    postType: postType,
    userId: "",
    imageUrlLink: "",
    friend: "",
    location: "",
    likedBy:[{}],
    dislikedBy:[{}],
    comments: [{}]
    
  })

  const createPost = async() => {
  
    try {
      
      setSubmitting(true);
  
      if (post === null || post.postText === "") {

        toast.info("Please write something to post!", { theme: "light" });
        return;
        
      }

      await axios.post("/api/post/new", post)
      toast.success("Post created.", { theme: "light" });
      textAreaRef.current.value = "";
      
      setPost({
    
        postText: "",
        postType: postType,
        userId: "",
        imageUrlLink: "",
        friend: "",
        location: "",
        likedBy: [{}],
        dislikedBy: [{}],
        comments: [{}],
        
      })

      setShouldFeedChangeSwitch((val) => !val);

    } catch (error) {

      toast.error(error.message, { theme: "dark" });

    } finally {

      setSubmitting(false);

    }

  }

  useEffect(() => {

    setActivePathName(pathName)

  }, [])
  
  return (

      <div className="create_post_container">

          <PostForm
            
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
            textAreaRef={textAreaRef}
            rows={4}
            pathName={pathName}

          />

      </div>

  )

}

export default CreatePost