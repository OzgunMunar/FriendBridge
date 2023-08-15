'use client'

import Form from "./Form"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const CreatePost = () => {

  const router = useRouter()
  const textAreaRef = useRef()

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

    } catch (error) {
      toast.error(error.message)
    } finally {
      setSubmitting(false)
    }

  }
  
  return (

      <div className="w-full">

          <Form
            
            type='Creat'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPost}
            textAreaRef={textAreaRef}

          />

          <Toaster position="top-right" reverseOrder={false}/>

      </div>

  )

}

export default CreatePost