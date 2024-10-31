import "@/app/_styles/post.css"
import { UserContext, FeedContext } from "../Contexts/Contexts"
import { useContext, useRef, useState, useEffect, Fragment } from 'react'
import axios from "axios"
import EditDeleteModal from "../Modals/EditDeleteModal"
import PostForm from "./PostForm"
import { toast } from "react-toastify";
import provideFullDateText from "@/helpers/dateFixer"

const Post = ({ post }) => {

    const { user } = useContext(UserContext)
    const { setShouldFeedChangeSwitch } = useContext(FeedContext)
    const textAreaRef = useRef()
    const EditOrDeleteRef = useRef(null)
    const commentTextAreaRef = useRef()
    const commentRef = useRef()

    const [postToEdit, setPostToEdit] = useState({
        postText: "",
        postId: post._id,
        userImageLink: "",
        friend: "",
        location: "",
        likedBy: [{}],
        comments: [{}]
    })

    const [comment, setComment] = useState({
        creator: user._id,
        comment: "",
        date: Date.now(),
        likedBy: []
    })

    const [isDropdown, setIsDropdown] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [expand, setExpand] = useState(false)
    const [height, setHeight] = useState(0)
    const [isLiking, setIsLiking] = useState(false)

    const fullDateTextForPost = provideFullDateText(post.createdAt)

    const openModal = () => {
        setIsEditModalOpen(true)
    }
    
    const closeModal = () => {
        setIsEditModalOpen(false)
    }

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
            postText: post.post,
            userImageLink: post.userImageLink,
            friend: post.friend,
            location: post.location,
            likedBy: post.likedBy,
            comments: post.comments
        })

        document.addEventListener('click', handleOutsideClick);

        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
        
    }, []);

    useEffect(() => {

        if(expand === true) {
            commentTextAreaRef.current.value = ""
            commentTextAreaRef.current.focus()
            setHeight(commentRef.current.scrollHeight);
        } else {
            setHeight(0)
        }

    }, [expand])
    
    const EditPost = async() => {

        try {

            setSubmitting(true)

            const result = await axios.patch(`/api/post/${post._id}`, postToEdit)
                                        .then(() => toast.success("Post edited", { theme: "light" }))
                                        .catch((error) => toast.error("An error occured during editing post."), { theme: "dark" })
            
            setShouldFeedChangeSwitch(val => !val)
            closeModal()
            setSubmitting(false)
        } catch (error) {
            toast.error(error.data, { theme: "dark" })
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

    const LikePost = async(postId) => {

        try {

            if(isLiking)
                return

            setIsLiking(val => !val)
            
            await axios.post("/api/post/likepost", { postId })
            setShouldFeedChangeSwitch(val => !val)
            
        } catch (error) {
            toast.error(error.message, { theme: "dark" })
        } finally {
            setIsLiking(val => !val)
        }

    }

    const HandleExpand = () => {
        setExpand(val => !val)
    }

    const HandleCommentShare = async() => {
        
        if(commentTextAreaRef.current.value === "") {
            toast.info("Write a comment to share.", { theme: "light" })
            return
        }

        const postId = post._id

        comment.comment = commentTextAreaRef.current.value

        await axios.patch(`/api/post/comment`, { postId, comment })
                                    .then(() => {
                                        toast.success("Comment added", { theme: "light" })
                                        setShouldFeedChangeSwitch(val => !val)
                                        setExpand(val => !val)
                                    })
                                    .catch((error) => toast.error("An error occured during adding comment."), { theme: "dark" })

        commentTextAreaRef.current.value = ""
        commentTextAreaRef.current.focus()

    }
    
    return (

        <div className="post_container">
            
            <div className="post_header">

                <div className="post_header_left_section">

                    <div className="post_user_image">
                        <img src={post.creator.userImageLink} alt="Picture of the post owner" loading="lazy" className="post_photo" />
                    </div>

                    <div className="post_info">
                        <p className="post_owners_name">{post.creator.username}</p>
                        <p className="post_posted_date">{fullDateTextForPost}</p>
                        { post.location && <p className="post_top_extra_info_text">In {post.location}</p> }
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

                                <p className="post_dropdown_content_action">
                                <img width="20" height="20" src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/external-bookmark-interface-dreamstale-lineal-dreamstale.png" alt="external-bookmark-interface-dreamstale-lineal-dreamstale"/>
                                    <span>Save Post</span>
                                </p>

                                <div className="w-full border border-gray-300 mx-1"></div>

                                <p className="post_dropdown_content_action">
                                    <img width="20" height="20" src="https://img.icons8.com/windows/50/complaint.png" alt="report-post"/>
                                    <span>Report Post</span>
                                </p>

                                <div className="w-full border border-gray-300 mx-1"></div>

                                {
                                    (post.likedBy.length === 0 & post.comments.length === 0) ?
                                    (
                                        <p className="post_dropdown_content_action" onClick={openModal}>
                                            <img width="20" height="20" src="https://img.icons8.com/ink/48/edit.png" alt="edit-post"/>
                                            <span>Edit</span>
                                        </p>
                                    ) 
                                    :
                                    (<div></div>)
                                }

                                <p className="post_dropdown_content_action" onClick={() => DeletePost(post._id)}>
                                    <img width="20" height="20" src="https://img.icons8.com/pulsar-line/48/filled-trash.png" alt="filled-trash"/>
                                    <span>Delete</span>
                                </p>

                            </div>

                        )}

                    </div>
                }
            </div>

            <div className="post_body">
                {post.post && <p>{post.post}</p>}
            </div>
            {
                post.imageUrlLink && 
                <div className="w-full my-3">
                    <img className="post_image" src={post.imageUrlLink} />
                </div>
            }

            {
                post.friend && 
                <div className="w-full mb-3">
                    {post.friend && <p className="post_top_extra_info_text">&#9830; With {post.friend}</p> }
                </div>
            }

            <div className="post_horizontal_line"></div>

            <div className="post_like_comment_share">

                <div className="post_action_button" onClick={() => LikePost(post._id)} aria-disabled={isLiking}>
                    {
                        post.likedBy.includes(user._id) ?
                        <img width="20" height="20" src="https://img.icons8.com/office/30/hearts.png" alt="hearts"/>
                        :
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/like--v1.png" alt="like--v1"/>
                    }    
                    <p>{post.likedBy.length} Likes</p>
                </div>

                <div className="post_action_button" onClick={() => HandleExpand()}>
                    <img width="20" height="20" src="https://img.icons8.com/ios/50/chat-message--v1.png" alt="chat-message--v1"/>
                    <p>{post.comments.length} Comments</p>
                </div>

                <div className="post_action_button">
                    <img width="20" height="20" src="https://img.icons8.com/material-rounded/24/share.png" alt="share"/>
                    <p>Share</p>
                </div>

            </div>
            
            <div className={`${expand ? 'expanded':''} post_comment_section_container`}
                ref={commentRef}
                style={{ maxHeight: `${expand ? `${height + 16}px`:`${height}px`}`, overflow: 'hidden' }}>
                    
                <div className="post_horizontal_line"></div>

                <div className="post_comment_top_section">
                    <p className="display-6">New Comment</p>
                    <button type="button" className="post_comment_top_section_share_button" onClick={() => HandleCommentShare()}>Share</button>
                </div>

                <div className="post_comment_middle_section">
                    
                    <textarea 
                        rows={4} 
                        placeholder={`${user.username ? `What do you think, ${user.username}?`:''}`}
                        className="post_comment_textarea overflow-hidden"
                        ref={commentTextAreaRef}
                        ></textarea>

                </div>
                
                <div className="post_comment_below_section">
                    {
                         
                        post.comments.length !== 0 && 
                        <div>

                            <div className="comment_horizontal_line"></div>
                            <p className="mt-3">Comments</p>

                            { post.comments.map((comment) => {
                                
                                return (
                                    <div key={comment._id}>
                                        <div className="post_comment">
                                            <img className="post_photo" src={comment.creator.userImageLink} alt="commentator photo" />
                                    
                                            <div className="post_comment_body">
                                                <span className="font-bold">{comment.creator.username}</span>
                                                <p className="text-xs mb-4">{provideFullDateText(comment.date)}</p>
                                                <p>{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })}

                        </div>
                    }

                </div>
                
            </div>
            
            <div className={isEditModalOpen ? "modal-container active":""}>

                <EditDeleteModal isOpen={isEditModalOpen} onClose={closeModal}>

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