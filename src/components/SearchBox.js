import React from "react";
import "./SearchBox.css";

const SearchBox = ({ data: { url, title, src } }) => {
  return (
    <>
      <a
        className="search-box"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1>{title}</h1>
        {url.includes("explore/") ? (
          title.startsWith("#") ? (
            <span className="search-hashtag"></span>
          ) : (
            <span className="search-location"></span>
          )
        ) : (
          <img
            className="search-image"
            srcSet={src}
            alt={title + "'s profile picture"}
            title={title + "'s profile picture"}
          />
        )}
      </a>
    </>
  );
};

export default SearchBox;
