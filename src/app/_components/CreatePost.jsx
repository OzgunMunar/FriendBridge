'use client'

import Form from "./Form"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const CreatePost = () => {

  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    
    postText: "",
    userId: ""
  })

  const createPost = async() => {
  
    setSubmitting(true)
    
    try {

      const response = await axios.post("/api/post/new", post)
      toast.success("Post created.")
      router.push('/')

    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setSubmitting(false)
    }

  }
  
  return (

      <div className="w-1/2">

          <Form
            
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}

          />

          <Toaster position="top-right" reverseOrder={false}/>

      </div>

  )

}

export default CreatePost