import "@/app/_styles/postform.css"
import { useEffect } from 'react'

const PostForm = ({ type, post, setPost, submitting, handleSubmit, textAreaRef, rows }) => {

  let buttonTextOnSubmitting = (type === 'Create' ? "Creating..." : "Editing...")

  useEffect(() => {

    textAreaRef.current.value = post.postText
    textAreaRef.current.focus()

  } ,[])

  let headerImgSource = (type === 'Create') ? "https://img.icons8.com/color/48/filled-plus-2-math.png" : "https://img.icons8.com/color/48/pen.png"
  
  return (

    <div className="post_form_container">

      <div className="post_form">

        <div className="form_header">
          <div className="form_header_icon_container">
            <img width="48" height="48" src={headerImgSource} alt="header icon"/>
          </div>
          
          <h2 className="post_header">{(type === 'Create' ? 'Create':'Edit')} Post</h2>
        </div>
        <div className="fading-line"></div>
        <div className="form">
          <textarea id="post_text" rows={rows} placeholder="What's on your mind?"
          ref={textAreaRef} 
          style={{ resize: (type==='Edit') ? 'none':'vertical' }}
          onChange = {(e) => setPost({...post, postText: e.target.value})}></textarea>

          <div className="form_button_container">
            <button type="submit" className="post_submit_button" disabled={submitting}  onClick={handleSubmit}>
                <img width="30" height="30" src="https://img.icons8.com/color/48/haiku.png" alt="haiku"/>
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