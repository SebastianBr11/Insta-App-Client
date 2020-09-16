import React from "react";

const Followers = ({ followers }) => {
  return (
    <div>
      {followers.map(f => (
        <div key={f.href}>
          <a href={f.href}>
            <img alt={f.alt} src={f.imgSrc} />
            {f.title} and {f.subtitle}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Followers;
