import "@/app/_styles/postform.css"
import { useEffect, useContext } from 'react'
import { UserContext } from "../Contexts/Contexts"

const PostForm = ({ type, post, setPost, submitting, handleSubmit, textAreaRef, rows }) => {

  let buttonTextOnSubmitting = (type === 'Create' ? "Creating..." : "Editing...")
  let userContext = useContext(UserContext);
  let user = userContext.user;

  useEffect(() => {

    textAreaRef.current.value = post.postText
    textAreaRef.current.focus()

  } ,[])
  
  return (

    <div className="post_form_container">

      <div className="post_form">

        <div className="form_header">
          
        </div>
        <div className="fading-line"></div>
        <div className="form">
          <textarea id="post_text" rows={rows} placeholder={`What's on your mind, ${user.username}?`}
          // ''
          ref={textAreaRef} 
          style={{ resize: (type==='Edit') ? 'none':'vertical' }}
          onChange = {(e) => setPost({...post, postText: e.target.value})}></textarea>

          <div className="form_below_container">

            <div className='iconsContainer'>

              <a href="#" className='form_icon_container'>
                <img width="25" height="25" src="https://img.icons8.com/fluency/48/image--v1.png" alt="image--v1"/>
                <span>Add Image</span>
              </a>

              <a href="#" className='form_icon_container'>
                <img className='mt-1' width="25" height="25" src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/external-tag-friends-ui-basic-anggara-flat-anggara-putra.png" alt="external-tag-friends-ui-basic-anggara-flat-anggara-putra"/>
                <span>Add Friend</span>
              </a>

              <a href="#" className='form_icon_container'>
                <img width="25" height="25" src="https://img.icons8.com/dusk/64/map.png" alt="map"/>
                <span>Add Location</span>
              </a>

            </div>

            <button type="submit" className="post_submit_button" disabled={submitting}  onClick={handleSubmit}>
              <span className='form_submit_button_text'>
                {submitting ? `${buttonTextOnSubmitting}` : "Post"}
              </span>
            </button>

          </div>
        </div>
      </div>
 
    </div>

  )

}

export default PostForm