import "@/app/_styles/post.css"
import { UserContext, FeedChangeContext } from "../Contexts/Contexts"
import { useContext, useRef, useState, useEffect } from 'react'
import axios from "axios"
import EditDeleteModal from "../Modals/EditDeleteModal"
import PostForm from "./PostForm"
import { toast } from "react-toastify";

const Post = ({ post }) => {

    const { user } = useContext(UserContext)
    const { setShouldFeedChangeSwitch } = useContext(FeedChangeContext)
    const textAreaRef = useRef()
    const EditOrDeleteRef = useRef(null)

    const [isDropdown, setIsDropdown] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [postToEdit, setPostToEdit] = useState({
        postText: "",
        postId: post._id
    })
    const [submitting, setSubmitting] = useState(false)

    const openModal = () => {
        setIsEditModalOpen(true)
    }
    
    const closeModal = () => {
        setIsEditModalOpen(false)
    }

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const dateAndTime = post.postedDate.split('T')
    const dayMonthYear = dateAndTime[0].split('-')
    const time = dateAndTime[1].split(":")
    
    function returnMonthName(monthNumber) {
        return monthNames[monthNumber - 1]
    }

    const fullDateText = `${dayMonthYear[2]} ${returnMonthName(dayMonthYear[1])} ${dayMonthYear[0]} at ${time[0]}:${time[1]}`

    function EditOrDeleteOpener() {
        setIsDropdown(status => !status)
    }

    useEffect(() => {

        const handleOutsideClick = (event) => {
  
          if (EditOrDeleteRef.current && !EditOrDeleteRef.current.contains(event.target)) {
            setIsDropdown(false);
          }
  
        };
        
        setPostToEdit({
            ...postToEdit,
            postText: post.post
        })
        // textAreaRef.current.focus()
        document.addEventListener('click', handleOutsideClick);

        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
        
    }, []);
    
    const EditPost = async() => {

        try {

            setSubmitting(true)

            const result = await axios.patch(`/api/post/${post._id}`, postToEdit)
                                        .then(() => toast.success("Post edited", { theme: "light" }))
                                        .catch((error) => toast.error("An error occured during editing post."), { theme: "dark" })
            
            setShouldFeedChangeSwitch(val => !val)
            closeModal()

        } catch (error) {
            toast.error(error.data, { theme: "dark" })
        } finally {
            setSubmitting(false)
        }

    }

    const DeletePost = async(postId) => {

        try {

            await axios.delete(`/api/post/${postId}`)
            .then(() => toast.success("Post deleted", { theme: "light" }))
            .catch((error) => toast.error("An error occured during deleting post.", { theme: "dark"} ))

            setShouldFeedChangeSwitch(val => !val)

        } catch (error) {

            toast.error("An error occured during deleting post.", { theme: "dark"})

        }

    }

    return (

        <div className="post_container">
            
            <div className="post_header">

                <div className="post_header_left_section">

                    <div className="post_user_image">
                        <img src={user.userImageLink} alt="Picture of the post owner" loading="lazy" className="post_photo" />
                    </div>

                    <div className="post_info">
                        <p className="post_owners_name">{post.creator.username}</p>
                        <p className="post_posted_date">{fullDateText}</p>
                    </div>

                </div>
                {(post.creator._id === user._id) &&
                    <div className="right_section_container">

                        <div ref={EditOrDeleteRef} className="post_header_right_actions_section">

                            <button className="right_actions_button" onClick={() => EditOrDeleteOpener()}>
                                <span>...</span>
                            </button>

                        </div>

                        {isDropdown && (

                            <div className="post_dropdown_content">

                                <p className="post_dropdown_content_action" onClick={openModal}>
                                    <img width="16" height="16" src="https://img.icons8.com/ink/48/edit.png" alt="edit"/>
                                    <span>Edit</span>
                                </p>

                                <div class="border-l border-gray-400 h-6"></div>

                                <p className="post_dropdown_content_action" onClick={() => DeletePost(post._id)}>
                                    <img width="16" height="16" src="https://img.icons8.com/ios-filled/50/trash.png" alt="trash"/>
                                    <span>Delete</span>
                                </p>

                            </div>

                        )}

                    </div>
                }
            </div>

            <div className="post_body">
                <p>{post.post}</p>
            </div>

            <div className="post_horizontal_line"></div>

            <div className="post_like_comment_share">

                <div className="post_action_button">
                    <img width="20" height="20" src="https://img.icons8.com/ios/50/like--v1.png" alt="like--v1"/>
                    <p>{post.likeNumber} Likes</p>
                </div>

                <div className="post_action_button">
                    <img width="20" height="20" src="https://img.icons8.com/ios/50/chat-message--v1.png" alt="chat-message--v1"/>
                    <p>{post.comments.length} Comments</p>
                </div>

                <div className="post_action_button">
                    <img width="20" height="20" src="https://img.icons8.com/material-rounded/24/share.png" alt="share"/>
                    <p>Share</p>
                </div>

            </div>
                
            <div className={isEditModalOpen ? "modal-container active":""}>

                <EditDeleteModal isOpen={ isEditModalOpen } onClose={closeModal}>

                    <PostForm
                        type='Edit'
                        post={postToEdit}
                        setPost={setPostToEdit}
                        submitting={submitting}
                        handleSubmit={EditPost}
                        textAreaRef={textAreaRef}
                        rows={8}
                    />

                </EditDeleteModal>
                
            </div>

        </div>
        
    )
    
}

export default Post