import React from 'react';
import "@/app/_styles/modal.css"

const EditDeleteModal = ({ isOpen, onClose, children }) => {
    return isOpen ? (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={onClose}>
            <img width="30" height="30" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1"/>
          </button>
          {children}
        </div>
      </div>
      ) : null;
};

export default EditDeleteModal;