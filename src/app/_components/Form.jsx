import "@/app/_styles/postform.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherPointed, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from 'react'

const Form = ({ type, post, setPost, submitting, handleSubmit, textAreaRef, rows }) => {

  useEffect(() => {

    textAreaRef.current.value = post.postText
    textAreaRef.current.focus()

  } ,[])

  return (

    <div className="post_form_container">

      <div className="post_form">

        <div className="form_header">
          <div className="form_header_icon_container">
            <FontAwesomeIcon icon={faPlus} className="form_header_icon"/>
          </div>
          
          <h2 className="post_header">{(type === 'Create' ? 'Create':'Edit')} Post</h2>
        </div>
        <div className="fading-line"></div>
        <div className="form">
          <textarea id="post_text" rows={rows} placeholder="What's on your mind?"
          ref={textAreaRef} 
          style={{ type:'Edit' ? 'resize-none':'' }}
          onChange = {(e) => setPost({...post, postText: e.target.value})}></textarea>

          <div className="form_button_container">
            <button type="submit" className="post_submit_button" disabled={submitting}  onClick={handleSubmit}>
                <FontAwesomeIcon icon={faFeatherPointed} />
                <span className='form_submit_button_text'>
                    {submitting ? `${type}ing...` : "Post"}
                </span>
            </button>
          </div>
        </div>
      </div>
 
    </div>

  )

}

export default Form