import React from "react";

const UserImages = ({ images }) => {
  return (
    <div>
      {images &&
        images.map(img => (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={img.href}
            key={img.href}
          >
            <img
              style={{ height: "100px" }}
              alt={img.alt}
              srcSet={img.srcSet}
            />
          </a>
        ))}
    </div>
  );
};

export default UserImages;
