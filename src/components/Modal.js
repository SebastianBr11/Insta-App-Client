import React, { useEffect, useState } from "react";
import UserDesc from "./UserDesc";
import CloseIcon from "./CloseIcon";
import "./Modal.css";

const Modal = ({ data, isOpen, setIsOpen, uid }) => {
  const [title] = useState(document.title);
  useEffect(() => {
    if (isOpen && data) {
      console.log(data);
      document.title = data.user.uid + " - " + title;
    } else {
      document.title = title;
    }
  }, [isOpen, data, title]);
  return (
    isOpen && (
      <div onClick={() => setIsOpen(false)} className="modal">
        <div onClick={e => e.stopPropagation()} className="modal-content">
          <UserDesc {...{ data, setIsOpen, uid }} />
          <div onClick={() => setIsOpen(false)} className="modal-close">
            <CloseIcon height="24px" width="24px" />
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
