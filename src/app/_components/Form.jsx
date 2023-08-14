import "@/app/_styles/postform.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeatherPointed, faPlus } from "@fortawesome/free-solid-svg-icons";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {

  return (

    <div className="post_form_container">

      <div className="post_form">

        <div className="form_header">
          <div className="form_header_icon_container">
            <FontAwesomeIcon icon={faPlus} className="form_header_icon"/>
          </div>
          
          <h2 className="post_header">{type} Post</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea id="post_text" rows="4" placeholder="What's on your mind?"
        //   value={post}
          onChange = {(e) => setPost({...post, postText: e.target.value})}></textarea>

          <div className="form_horizontal_line"></div>
          <div className="form_button_container">
            <button type="submit" className="post_submit_button" disabled={submitting}>
                <FontAwesomeIcon icon={faFeatherPointed} />
                <span className='form_submit_button_text'>
                    {submitting ? `${type}ing...` : "Post"}
                </span>
            </button>
          </div>
        </form>
      </div>
 
    </div>

  )

}

export default Form