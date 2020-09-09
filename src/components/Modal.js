import React from "react";
import UserDesc from "./UserDesc";
import CloseIcon from "./CloseIcon";
import "./Modal.css";

const Modal = ({ data, isOpen, setIsOpen }) => {
  return (
    isOpen && (
      <div onClick={() => setIsOpen(false)} className="modal">
        <div onClick={e => e.stopPropagation()} className="modal-content">
          <UserDesc {...{ data, setIsOpen }} />
          <div onClick={() => setIsOpen(false)} className="modal-close">
            <CloseIcon height="24px" width="24px" fillColor="white" />
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
