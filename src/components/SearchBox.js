import React, { useState } from "react";
import Spinner from "./Spinner";
import "./SearchBox.css";
import Util from "../util/util";
import UserDesc from "./UserDesc";

const SearchBox = ({ data: { url, title, src } }) => {
  const [showMore, setShowMore] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const onClick = async () => {
    setShowMore(!showMore);
    if (!isLoaded) {
      setIsLoading(true);
      const newData = await Util.fetchUserData(title);
      setIsLoaded(true);
      setIsLoading(false);
      setData(newData);
    }
  };

  return (
    <div className="search-box-div">
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
      {!url.includes("explore") && (
        <>
          <button onClick={onClick} type="button" className="show-more">
            Show {showMore ? "Less" : "More"}
          </button>
          {showMore &&
            (isLoading ? <Spinner size="sm" /> : <UserDesc user={data} />)}
        </>
      )}
    </div>
  );
};

export default SearchBox;
