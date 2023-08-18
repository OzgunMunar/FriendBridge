import React from 'react';
import "@/app/_styles/modal.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark
} from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, onClose, children }) => {
    return isOpen ? (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {children}
        </div>
      </div>
      ) : null;
};

export default Modal;
