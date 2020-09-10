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
    followedBy,
  } = data?.user;

  const onClick = () => {
    data.setIsLoaded(false);
    data.setIsLoading(true);
    data.onClick();
    setIsOpen(false);
  };
  return (
    <div className="user-desc">
      {name && <h2 className="name">{name}</h2>}
      {desc && <h3 className="desc">{desc}</h3>}
      {link && <a href={link}>{linkText}</a>}
      {followers && (
        <h4 className="followers">
          <span>{followers}</span>{" "}
          {followers !== "1" ? "followers" : "follower"}
        </h4>
      )}
      {following && (
        <h4 className="following">
          following <span>{following}</span>{" "}
          {following !== "1" ? "users" : "user"}
        </h4>
      )}
      {posts && (
        <h4 className="posts">
          <span>{posts}</span> {posts !== "1" ? "posts" : "post"}
        </h4>
      )}
      {followedBy && <h4 className="followed-by">{followedBy}</h4>}
      <button className="reload-button" onClick={onClick}>
        Reload
      </button>
      {images && <UserImages images={images} />}
    </div>
  );
};

export default UserDesc;
