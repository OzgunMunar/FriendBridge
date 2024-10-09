'use client'

import Form from "./PostForm"
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FeedChangeContext } from "../Contexts/Contexts";
import "@/app/_styles/createpost.css"
import { toast } from "react-toastify";


const CreatePost = () => {

  const router = useRouter()
  const textAreaRef = useRef()

  const { setShouldFeedChangeSwitch } = useContext(FeedChangeContext)

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    
    postText: "",
    userId: "",
    image: null
    
  })

  const createPost = async() => {
  
    try {
      
      setSubmitting(true);
  
      if (post === null || post.postText === "") {

        toast.error("Please write something to post!", { theme: "dark" });
        return;
        
      }

      await axios.post("/api/post/new", post)
  
      toast.success("Post created.", { theme: "light" });
      textAreaRef.current.value = "";

      router.push("/");

      setShouldFeedChangeSwitch((val) => !val);

    } catch (error) {

      toast.error(error.message, { theme: "dark" });

    } finally {

      setSubmitting(false);

    }

  }
  
  return (

      <div className="create_post_container">

          <Form
            
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
            textAreaRef={textAreaRef}
            rows={4}

          />

      </div>

  )

}

export default CreatePost