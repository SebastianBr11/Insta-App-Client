import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import Util from "../util/util";
import { usePersistedState } from "../util/hooks";
import "./UserDesc.css";
import UserImages from "./UserImages";
import Followers from "./Followers";

const UserDesc = ({ data, setIsOpen, uid }) => {
  const {
    desc,
    followers: followersNum,
    following: followingNum,
    link,
    linkText,
    name,
    posts,
    images,
    followedBy,
    uid: userId,
  } = data?.user;

  const [followers, setFollowers] = usePersistedState(
    "followers" + Util.capitalize(userId),
    null
  );
  const [showFollowers, setShowFollowers] = usePersistedState(
    "showFollowers" + Util.capitalize(userId),
    false
  );
  const [followersLoading, setFollowersLoading] = usePersistedState(
    "followersLoading" + Util.capitalize(userId),
    false
  );
  const [followersLoaded, setFollowersLoaded] = usePersistedState(
    "followersLoaded" + Util.capitalize(userId),
    false
  );

  const [following, setFollowing] = usePersistedState(
    "following" + Util.capitalize(userId),
    null
  );
  const [showFollowing, setShowFollowing] = usePersistedState(
    "showFollowing" + Util.capitalize(userId),
    false
  );
  const [followingLoading, setFollowingLoading] = usePersistedState(
    "followingLoading" + Util.capitalize(userId),
    false
  );
  const [followingLoaded, setFollowingLoaded] = usePersistedState(
    "followingLoaded" + Util.capitalize(userId),
    false
  );

  const cancelToken = useRef(undefined);

  const onReloadClick = () => {
    data.setIsLoaded(false);
    data.setIsLoading(true);
    data.onClick();
    setIsOpen(false);
  };

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
    if (data?.user && data?.user?.private) return;
    if (!followersLoaded && followersNum !== "0" && !followersLoading) {
      setFollowersLoading(true);
    }
  };

  const loadMoreFollowers = () => {
    setFollowersLoaded(false);
    setFollowersLoading(true);
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
    if (data?.user && data?.user?.private) return;
    if (!followingLoaded && followingNum !== "0" && !followingLoading)
      setFollowingLoading(true);
  };

  const loadMoreFollowing = () => {
    setFollowingLoaded(false);
    setFollowingLoading(true);
  };

  useEffect(() => {
    if (followersLoading && !followersLoaded) {
      console.log(cancelToken);
      if (typeof cancelToken.current != typeof undefined) {
        cancelToken.current.cancel("Operation canceled due to new request.");
      }
      cancelToken.current = axios.CancelToken.source();
      Util.fetchFollowers(
        uid,
        userId,
        20,
        followers?.followers?.length ?? 0,
        cancelToken.current
      )
        .then(newFollowers => {
          setFollowersLoaded(!!newFollowers);
          setFollowersLoading(false);
          setFollowers({
            id: followers?.id,
            followers: [
              ...(followers?.followers ?? []),
              ...newFollowers?.followers,
            ],
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [
    followersLoading,
    followersLoaded,
    setFollowersLoaded,
    setFollowersLoading,
    setFollowers,
    userId,
    uid,
    followers?.followers?.length,
  ]);

  useEffect(() => {
    if (followingLoading && !followingLoaded) {
      console.log(cancelToken);
      if (typeof cancelToken.current != typeof undefined) {
        cancelToken.current.cancel("Operation canceled due to new request.");
      }
      cancelToken.current = axios.CancelToken.source();
      Util.fetchFollowing(
        uid,
        userId,
        20,
        following?.following?.length ?? 0,
        cancelToken.current
      )
        .then(newFollowing => {
          if (!newFollowing) {
            setFollowingLoaded(false);
          } else {
            setFollowingLoaded(true);
          }
          setFollowingLoading(false);
          setFollowing({
            id: following?.id,
            following: [
              ...(following?.following ?? []),
              ...newFollowing?.following,
            ],
          });
        })
        .catch(e => console.log(e));
    }
  }, [
    followingLoaded,
    followingLoading,
    setFollowing,
    setFollowingLoaded,
    setFollowingLoading,
    uid,
    userId,
    following?.following?.length,
  ]);
  return (
    <div className="user-desc">
      {name && <h2 className="name">{name}</h2>}
      {desc && <h3 className="desc">{desc}</h3>}
      {link && <a href={link}>{linkText}</a>}
      {followersNum && (
        <h4
          data-show={showFollowers && !!followers?.followers}
          data-loading={showFollowers && followersLoading}
          className="followers"
        >
          <span onClick={toggleFollowers}>
            <span className="bold">{followersNum}</span>{" "}
            {followersNum !== "1" ? "followers" : "follower"}
            {!followersLoaded &&
              !followersLoading &&
              !data?.user?.private &&
              followersNum !== "0" && <span className="badge">load</span>}
          </span>
          {showFollowers &&
            (!followersLoading ? (
              followers?.followers && (
                <>
                  <Followers followers={followers.followers} />
                  <button className="load-more" onClick={loadMoreFollowers}>
                    Load More
                  </button>
                </>
              )
            ) : (
              <Spinner size="sm" />
            ))}
        </h4>
      )}
      {followingNum && (
        <h4
          data-show={showFollowing && !!following?.following}
          data-loading={showFollowing && followingLoading}
          className="following"
        >
          <span onClick={toggleFollowing}>
            following <span className="bold">{followingNum}</span>{" "}
            {followingNum !== "1" ? "users" : "user"}
            {!followingLoaded &&
              !followingLoading &&
              !data?.user?.private &&
              followingNum !== "0" && <span className="badge">load</span>}
          </span>
          {showFollowing &&
            (!followingLoading ? (
              following?.following && (
                <>
                  <Followers followers={following.following} />
                  <button className="load-more" onClick={loadMoreFollowing}>
                    Load More
                  </button>
                </>
              )
            ) : (
              <Spinner size="sm" />
            ))}
        </h4>
      )}
      {posts && (
        <h4 className="posts">
          <span>{posts}</span> {posts !== "1" ? "posts" : "post"}
        </h4>
      )}
      {followedBy && <h4 className="followed-by">{followedBy}</h4>}
      <button className="reload-button" onClick={onReloadClick}>
        Reload
      </button>
      {images && <UserImages images={images} />}
    </div>
  );
};

export default UserDesc;
