import "@/app/_styles/postform.css"
import { useEffect, useContext, useReducer } from 'react'
import { UserContext } from "../Contexts/Contexts"
import { INITIAL_STATE, extraInfoReducer } from "@/app/reducers/extraInfoReducer"

const PostForm = ({ type, post, setPost, submitting, handleSubmit, textAreaRef, rows }) => {

  const [state, dispatch] = useReducer(extraInfoReducer, INITIAL_STATE)

  let buttonTextOnSubmitting = (type === 'Create' ? "Creating..." : "Editing...")
  let userContext = useContext(UserContext);
  let user = userContext.user;

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = post.postText;
      textAreaRef.current.focus();
    }
  }, [post.postText, textAreaRef]); 

  const ActionHandle = () => {

    dispatch({ type: "DefaultValues" })
    handleSubmit()

  }

  const expand = state.image || state.friend || state.location;

  return (

    <div className="post_form_container">

      <div className="post_form">

        <div className={`${post.friend ? 'block':'hidden'}`}>

          <p className="post_top_extra_info_text">&#9830; With {post.friend}</p>

        </div>

        <div className={`${post.location ? 'block':'hidden'}`}>

          <p className="post_top_extra_info_text">&#9830; In {post.location}</p>

        </div>

        <div className={`${post.imageUrlLink ? 'block':'hidden'} post_top_extra_info_text`}>

          <span>&#9830; Image Link: </span>
          <a className="block overflow-hidden whitespace-nowrap text-ellipsis underline" href={ post.imageUrlLink } target="_blank">
            { post.imageUrlLink }
          </a>

        </div>

        <div className="form">
          
          <textarea rows={rows} placeholder={`${user.username ? `What do you think, ${user.username}?`:''}`}
          ref={textAreaRef} 
          className="post_form_textarea"
          style={{ resize: (type==='Edit') ? 'none':'vertical' }}
          onChange = {(e) => setPost({...post, postText: e.target.value})}></textarea>

          <div className="form_below_container">

            <div className='iconsContainer'>
              
              <a className={`${post.imageUrlLink && 'text-green-500'} form_icon_container`} onClick={() => dispatch({ type: "OpenImageSection" })}>
                <img width="25" height="25" src="https://img.icons8.com/fluency/48/image--v1.png" alt="image--v1"/>
                {
                  post.imageUrlLink !== "" ?
                    <span>Change Image</span>
                  :
                    <span>Add Image</span>
                }
              </a>
              
              <a className={`${post.friend && 'text-green-500'} form_icon_container`} onClick={() => dispatch({ type: "OpenFriendSection" })}>
                <img className='mt-1' width="21" height="21" src="https://img.icons8.com/external-anggara-flat-anggara-putra/32/external-tag-friends-ui-basic-anggara-flat-anggara-putra.png" />
                {
                  post.friend !== "" ?
                    <span>Change Friend</span>
                  :
                    <span>Add Friend</span>
                }
              </a>
              
              <a className={`${post.location && 'text-green-500'} form_icon_container`} onClick={() => dispatch({ type: "OpenLocationSection" })}>
                <img width="25" height="25" src="https://img.icons8.com/dusk/64/map.png" alt="map"/>
                {
                  post.location !== "" ?
                    <span>Change Location</span>
                  :
                    <span>Add Location</span>
                }
              </a>

            </div>

            <button type="submit" className="post_submit_button" disabled={submitting}  onClick={ActionHandle}>
              <span className='form_submit_button_text'>
                {submitting ? `${buttonTextOnSubmitting}` : "Post"}
              </span>
            </button>

          </div>

          <div className={`${expand ? 'expanded':''} post_form_extras_container w-full`}>

            { state.image && 

              <div className="post_form_extras_line">
                <input type="text" 
                  className="post_form_extras_inputs" 
                  placeholder="Add Image Link" 
                  onChange={(e) => setPost({...post, imageUrlLink: e.target.value})}
                  value={post.imageUrlLink}
                  autoFocus
                  /> 
              </div>

            }

            { state.friend && 

              <div className="post_form_extras_line">
                <input type="text" 
                  className="post_form_extras_inputs" 
                  placeholder="Add Friend(s) Name" 
                  onChange={(e) => setPost({...post, friend: e.target.value})}
                  value={post.friend}
                  autoFocus
                  /> 
              </div>

            }

            { state.location && 
            
              <div className="post_form_extras_line">
                <input type="text" 
                  className="post_form_extras_inputs" 
                  placeholder="Add Location" 
                  onChange={(e) => setPost({...post, location: e.target.value})}
                  value={post.location}
                  autoFocus
                  /> 
              </div>

            }

          </div>

        </div>
      </div>
 
    </div>

  )

}

export default PostForm