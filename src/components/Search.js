import React, { useEffect, useState } from "react";
import Util from "../util/util";
import "./Search.css";
import Spinner from "./Spinner";
import SearchBox from "./SearchBox";
import { usePersistedState } from "../util/hooks";
import Modal from "./Modal";

const defaultPic =
  "https://instagram.fpen1-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fpen1-1.fna.fbcdn.net&_nc_ohc=TxAf-mrbVlQAX8xfQQk&oh=57d6526472161a4fcb6925971c1add81&oe=5F5ED20F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2";

const Search = ({ uid, refe }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = usePersistedState("searchData", [
    { src: defaultPic, subtitle: "test", title: "test", url: "/" },
  ]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  };

  useEffect(() => {
    (async () => {
      if (isLoading) {
        try {
          const newData = await Util.fetchResults(uid, query);
          setData(newData.results);
        } catch (e) {
          setError("an error ocurred");
        }
        setIsLoading(false);
      }
    })();
  }, [isLoading, query, setData, uid]);

  return (
    <div className="search-container">
      <form onSubmit={onSubmit} className="form">
        <input
          ref={refe}
          autoFocus
          placeholder="Search..."
          className="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          disabled={isLoading}
        />
        {error ? (
          <h4>{error}</h4>
        ) : isLoading ? (
          <div className="spinner-box">
            <Spinner size="md" />
          </div>
        ) : (
          <div className="searches">
            {data?.map(item => (
              <SearchBox
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                uid={uid}
                key={item.url}
                data={item}
                setModalData={setModalData}
              />
            ))}
          </div>
        )}
      </form>
      <Modal
        data={modalData}
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
      ></Modal>
    </div>
  );
};

export default Search;
