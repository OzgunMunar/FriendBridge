'use client'

import Form from "./Form"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const CreatePost = ({isRecordCreated}) => {

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
      router.push('/')
      isRecordCreated(val => !val)

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

          />

          <Toaster position="top-right" reverseOrder={false}/>

      </div>

  )

}

export default CreatePost