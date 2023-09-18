'use client'

import Form from "./PostForm"
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FeedChangeContext } from "../Contexts/Contexts";
import "@/app/_styles/createpost.css"

const CreatePost = () => {

  const router = useRouter()
  const textAreaRef = useRef()

  const { setShouldFeedChangeSwitch } = useContext(FeedChangeContext)

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    
    postText: "",
    userId: ""
    
  })

  const createPost = async() => {
  
    try {

      setSubmitting(true)

      await axios.post("/api/post/new", post)
      toast.success("Post created.")

      textAreaRef.current.value = ""
      router.push('/')
      setShouldFeedChangeSwitch(val => !val)

    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
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

          <Toaster position="top-center" reverseOrder={false}/>

      </div>

  )

}

export default CreatePost