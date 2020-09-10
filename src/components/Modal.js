import React, { useEffect } from "react";
import UserDesc from "./UserDesc";
import CloseIcon from "./CloseIcon";
import "./Modal.css";

const Modal = ({ data, isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen && data) {
      console.log(data);
      document.title = data.user.uid + " - React App";
    } else {
      document.title = "React App";
    }
  }, [isOpen, data]);
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
