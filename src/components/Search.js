import React, { useState } from "react";
import Util from "../util/util";
import "./Search.css";
import Spinner from "./Spinner";
import SearchBox from "./SearchBox";

const defaultPic =
  "https://instagram.fpen1-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fpen1-1.fna.fbcdn.net&_nc_ohc=TxAf-mrbVlQAX8xfQQk&oh=57d6526472161a4fcb6925971c1add81&oe=5F5ED20F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2";

const Search = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([
    { src: defaultPic, subtitle: "test", title: "test", url: "/" },
  ]);

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const newData = await Util.fetchResults(query);
    setIsLoading(false);
    setData(newData.results);
  };

  return (
    <div className="search-container">
      <form onSubmit={onSubmit} className="form">
        <input
          className="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="spinner-box">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <div className="searches">
            {data?.map(item => (
              <SearchBox key={item.url} data={item} />
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Search;
