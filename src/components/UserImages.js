import React from "react";
import UserImage from "./UserImage";
import "./UserImages.css";

const UserImages = ({ images }) => {
  return images ? (
    <div className="user-images">
      {images && images.map(img => <UserImage key={img.href} img={img} />)}
    </div>
  ) : null;
};

export default UserImages;
