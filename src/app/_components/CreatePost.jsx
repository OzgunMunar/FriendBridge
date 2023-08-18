'use client'

import Form from "./Form"
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FeedChangeContext } from "./Contexts";

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

      <div className="w-2/3">

          <Form
            
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
            textAreaRef={textAreaRef}
            rows={4}

          />

          <Toaster position="top-right" reverseOrder={false}/>

      </div>

  )

}

export default CreatePost