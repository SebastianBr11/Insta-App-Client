import React from "react";
import "./UserDesc.css";

const UserDesc = ({ user }) => {
  const { desc, followers, following, link, linkText, name, posts } = user;
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
    </div>
  );
};

export default UserDesc;
