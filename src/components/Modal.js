import React from "react";
import UserDesc from "./UserDesc";
import "./Modal.css";

const Modal = ({ data, isOpen, setIsOpen }) => {
  return (
    isOpen && (
      <div onClick={() => setIsOpen(false)} className="modal">
        <div onClick={e => e.stopPropagation()} className="modal-content">
          <UserDesc user={data} />
        </div>
      </div>
    )
  );
};

export default Modal;
