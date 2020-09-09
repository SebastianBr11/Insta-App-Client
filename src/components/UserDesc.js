import React from "react";
import "./UserDesc.css";
import UserImages from "./UserImages";

const UserDesc = ({ data, setIsOpen }) => {
  const {
    desc,
    followers,
    following,
    link,
    linkText,
    name,
    posts,
    images,
  } = data?.user;

  const onClick = () => {
    data.setIsLoaded(false);
    data.setIsLoading(true);
    data.onClick();
    setIsOpen(false);
  };
  return (
    <div className="user-desc">
      <h2 className="name">{name}</h2>
      <h3 className="desc">{desc}</h3>
      {link && <a href={link}>{linkText}</a>}
      <h4 className="followers">
        <span>{followers}</span> followers
      </h4>
      <h4 className="following">
        following <span>{following}</span> users
      </h4>
      <h4 className="posts">
        <span>{posts}</span> posts
      </h4>
      <button onClick={onClick}>Reload</button>
      <UserImages images={images} />
    </div>
  );
};

export default UserDesc;
