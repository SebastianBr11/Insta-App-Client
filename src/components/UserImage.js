import React from "react";
import "./UserImage.css";

const UserImage = ({ img: { href, alt, srcSet } }) => {
  return (
    <a
      className="user-image-link"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      key={href}
    >
      <img className="user-image" alt={alt} title={alt} srcSet={srcSet} />
    </a>
  );
};

export default UserImage;
