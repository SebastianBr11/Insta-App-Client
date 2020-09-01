import React from "react";
import Spinner from "./Spinner";
import "./SearchBox.css";
import Util from "../util/util";
import UserDesc from "./UserDesc";
import { usePersistedState } from "../util/hooks";

const SearchBox = ({ data: { url, title, src } }) => {
  const [showMore, setShowMore] = usePersistedState(
    "searchBoxShowMore" + Util.capitalize(title),
    false
  );
  const [isLoaded, setIsLoaded] = usePersistedState(
    "searchBoxIsLoaded" + Util.capitalize(title),
    false
  );
  const [isLoading, setIsLoading] = usePersistedState(
    "searchBoxIsLoading" + Util.capitalize(title),
    false
  );
  const [data, setData] = usePersistedState(
    "searchBoxData" + Util.capitalize(title),
    {}
  );

  const onClick = async e => {
    setShowMore(!showMore);
    if (!isLoaded && !isLoading) {
      setIsLoading(true);
      const newData = await Util.fetchUserData(title).catch(e =>
        console.log(e)
      );
      if (!newData) {
        setIsLoaded(false);
      } else {
        setIsLoaded(true);
      }
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
