import React from "react";

import "./Followers.css";

const Followers = ({ followers }) => {
  return (
    <div className="followers-container">
      {followers.map(f => (
        <div
          data-title={f.title}
          data-subtitle={f.subtitle}
          className="follower-container"
          key={f.href}
        >
          <a className="follower-link" href={f.href}>
            <img
              title={f.alt}
              className="follower-img"
              alt={f.alt}
              src={f.imgSrc}
            />
          </a>
        </div>
      ))}
    </div>
  );
};

export default Followers;
