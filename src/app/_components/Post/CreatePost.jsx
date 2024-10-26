'use client'

import PostForm from "./PostForm"
import { useState, useRef, useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { FeedChangeContext } from "../Contexts/Contexts";
import "@/app/_styles/createpost.css"
import { toast } from "react-toastify";


const CreatePost = () => {

  const router = useRouter()
  const pathName = usePathname()
  const textAreaRef = useRef()

  const { setShouldFeedChangeSwitch } = useContext(FeedChangeContext)

  const [activePathName, setActivePathName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    
    postText: "",
    userId: "",
    imageUrlLink: "",
    friend: "",
    location: "",
    likedBy:[{}],
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

      router.push("/");

      setPost({
    
        postText: "",
        userId: "",
        imageUrlLink: "",
        friend: "",
        location: "",
        likedBy: [{}],
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