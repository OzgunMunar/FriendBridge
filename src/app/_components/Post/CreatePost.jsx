'use client'

import PostForm from "./PostForm"
import { useState, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useFeedContext } from "../Contexts/FeedContext";
import { useUserContext } from "../Contexts/UserContext";
import "@/app/_styles/createpost.css"


const CreatePost = ({ postType }) => {

  const { addPost } = useFeedContext()
  const { user, setUser } = useUserContext()

  const pathName = usePathname()
  const textAreaRef = useRef()

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
    comments: [{}],
    groupId: "", // groupId
    eventId: "" // eventId
    
  })

  const createPost = async() => {
  
    try {
      
      setSubmitting(true);
  
      if (post === null || post.postText === "") {

        toast.info("Please write something to post!", { theme: "light" });
        return;
        
      }
      let newPost = await axios.post("/api/post/new", post)
      toast.success("Post created.", { theme: "light" })

      const id = newPost.data.creator
      
      newPost.data.creator = {
        _id: id,
        username: user.username,
        userImageLink: user.userImageLink
      }

      addPost(newPost.data)
      
      setUser((prevUser) => ({
        ...prevUser,
        postNumber: prevUser.postNumber + 1
      }))

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
        groupId: "", // groupId
        eventId: "" // eventId

      })

    } catch (error) {

      toast.error(error.message, { theme: "dark" });

    } finally {

      setSubmitting(false);

    }

  }
  
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