import React from "react";
import UserImage from "./UserImage";
import "./UserImages.css";

const UserImages = ({ images }) => {
  return (
    <div className="user-images">
      {images && images.map(img => <UserImage img={img} />)}
    </div>
  );
};

export default UserImages;
