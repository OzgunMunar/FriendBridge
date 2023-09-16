import "@/app/_styles/post.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faComments, faShare, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import { UserContext } from "../Contexts/Contexts"
import { useContext, useRef, useState, useEffect } from 'react'
import axios from "axios"
import { Toaster, toast } from "react-hot-toast";
import Modal from "../EditDeleteModal/Modal"
import Form from "./Form"
import { FeedChangeContext } from "../Contexts/Contexts"

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
                                        .then(() => toast.success("Post edited"))
                                        .catch((error) => toast.error("An error occured during editing post."))
            
            setShouldFeedChangeSwitch(val => !val)
            closeModal()

        } catch (error) {
            console.log(error.data)
            toast.error(error.data)
        } finally {
            setSubmitting(false)
        }

    }

    const DeletePost = async(postId) => {

        try {

            await axios.delete(`/api/post/${postId}`)
            .then(() => toast.success("Post deleted"))
            .catch((error) => toast.error("An error occured during deleting post."))

            setShouldFeedChangeSwitch(val => !val)

        } catch (error) {

            console.log(error)
            toast.error("An error occured during deleting post.")

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
                                    <img width="30" height="30" src="https://img.icons8.com/color/48/map-editing.png" alt="map-editing"/>
                                    <span>Edit</span>
                                </p>
                                <div>|</div>
                                <p className="post_dropdown_content_action" onClick={() => DeletePost(post._id)}>
                                    <img width="30" height="30" src="https://img.icons8.com/color/48/delete-forever.png" alt="delete-forever"/>
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
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <p>({post.likeNumber}) Like</p>
                </div>

                <div className="post_action_button">
                    <FontAwesomeIcon icon={faComments} />
                    <p>({post.comments.length}) Comments</p>
                </div>

                <div className="post_action_button">
                    <FontAwesomeIcon icon={faShare} />
                    <p>Share</p>
                </div>

            </div>

            <div className="post_horizontal_line"></div>

            <div className="post_comment_section">

            </div>

            <Toaster position="top-right" reverseOrder={false}/>

            <div>
                
                <div className={isEditModalOpen ? "modal-container active":"modal-container"}>

                    <Modal isOpen={ isEditModalOpen } onClose={closeModal}>

                        <Form
                            type='Edit'
                            post={postToEdit}
                            setPost={setPostToEdit}
                            submitting={submitting}
                            handleSubmit={EditPost}
                            textAreaRef={textAreaRef}
                            rows={8}
                        />

                    </Modal>
                    
                </div>

            </div>

        </div>
        
    )
    
}

export default Post