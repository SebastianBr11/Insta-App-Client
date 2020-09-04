import React, { useEffect } from "react";
import Spinner from "./Spinner";
import "./SearchBox.css";
import Util from "../util/util";
import UserDesc from "./UserDesc";
import { usePersistedState } from "../util/hooks";

const SearchBox = ({ uid, data: { url, title, src } }) => {
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
    null
  );

  const onClick = async e => {
    setShowMore(!showMore);
    console.log(isLoaded);
    if (!isLoaded) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded && isLoading) {
        const newData = await Util.fetchUserData(uid, title).catch(e =>
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
    })();
  }, [isLoaded, isLoading, setData, setIsLoaded, setIsLoading, title, uid]);

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
            (isLoading && !data ? (
              <Spinner size="sm" />
            ) : (
              data && <UserDesc user={data} />
            ))}
        </>
      )}
    </div>
  );
};

export default SearchBox;
