import React from 'react'
import '@/app/_styles/modal.css'

const ModalEditProfile = ({ isOpen, onClose, userInfo, usernameRef, handleSubmit, setuserInfo }) => {

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          <img width="30" height="30" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1"/>
        </button>
        <div className='modalprofile_container'>
                            
          <div className='modalprofile_header_container'>
              <p className='modalprofile_header'>Edit Profile</p>
          </div>

          <div className='modalprofile_body_container'>

              <div className='modal_info_row'>
                  <label htmlFor='username'>Full Name:</label>
                  <input type='text' id='username' ref={usernameRef}
                         className='modal_info_input'
                         value={userInfo.username}
                         onChange={(e) => setuserInfo({...userInfo, username: e.target.value})}/>
              </div>

              <div className='modal_info_row'>
                  <label htmlFor='userImageLink'>User Image Link:</label>
                  <input type='text' id='userImageLink'
                         className='modal_info_input'
                         value={userInfo.userImageLink}
                         onChange={(e) => setuserInfo({...userInfo, userImageLink: e.target.value})}/>
              </div>

              <div className='modal_info_row'>
                  <label htmlFor='city'>City:</label>
                  <input type='text' id='city'
                         className='modal_info_input'
                         value={userInfo.city}
                         onChange={(e) => setuserInfo({...userInfo, city: e.target.value})}/>
              </div>

              <div className='modal_info_row'>
                  <label htmlFor='profession'>Profession:</label>
                  <input type='text' id='profession'
                         className='modal_info_input'
                         value={userInfo.profession}
                         onChange={(e) => setuserInfo({...userInfo, profession: e.target.value})}/>
              </div>

              <div className='modal_info_row'>
                  <label htmlFor='phonenumber'>Phone Number:</label>
                  <input type='text' id='phonenumber'
                         className='modal_info_input'
                         value={userInfo.phonenumber}
                         onChange={(e) => setuserInfo({...userInfo, phonenumber: e.target.value})}/>
              </div>

              <div className='modal_info_row'>
                  <label htmlFor='address'>Address:</label>
                  <input type='text' id='address' 
                         className='modal_info_input'
                         value={userInfo.address}
                         onChange={(e) => setuserInfo({...userInfo, address: e.target.value})}/>
              </div>

              <div className='modal_info_row'>
                  <label htmlFor='personalwebsite'>Personal WebSite:</label>
                  <input type='text' id='personalwebsite'
                         className='modal_info_input'
                         value={userInfo.personalwebsite}
                         onChange={(e) => setuserInfo({...userInfo, personalwebsite: e.target.value})}/>
              </div>

              <div className='modal_info_row'>
                  <label htmlFor='birthday'>Birthday:</label>
                  <input type='text' id='birthday'
                         className='modal_info_input'
                         value={userInfo.birthday}
                         onChange={(e) => setuserInfo({...userInfo, birthday: e.target.value})}/>
              </div>

              <div className='modal_info_row'>
                  <label htmlFor='gender'>Gender:</label>
                  <select className='modal_info_select_input' 
                          id='gender'
                          onChange = {(e) => setuserInfo({...userInfo, gender: e.target.value})}
                          value = {userInfo.gender}>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                  </select>
              </div>

          </div>

          <div className='modalprofile_footer_container'>
            <button className='modalprofile_close_button' onClick={onClose}>Close</button>
            
            <button className='modalprofile_submit_button' type='button' onClick={handleSubmit}>Submit</button>
          </div>

        </div>
      </div>
    </div>
    ) : null;

}

export default ModalEditProfile