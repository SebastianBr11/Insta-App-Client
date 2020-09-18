import React, { useEffect, useState } from "react";
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

  const onReloadClick = () => {
    data.setIsLoaded(false);
    data.setIsLoading(true);
    data.onClick();
    setIsOpen(false);
  };

  const toggleFollowers = () => {
    setShowFollowers(!showFollowers);
    if (data?.user && data?.user?.private) return;
    if (!followersLoaded && followersNum !== "0") {
      setFollowersLoading(true);
    }
  };

  const toggleFollowing = () => {
    setShowFollowing(!showFollowing);
    if (data?.user && data?.user?.private) return;
    if (!followingLoaded && followingNum !== "0") setFollowingLoading(true);
  };

  useEffect(() => {
    if (followersLoading && !followersLoaded) {
      Util.fetchFollowers(uid, userId, 20)
        .then(newFollowers => {
          setFollowersLoaded(!!newFollowers);
          setFollowersLoading(false);
          setFollowers(newFollowers);
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
  ]);

  useEffect(() => {
    if (followingLoading && !followingLoaded) {
      console.log("fetching again");
      Util.fetchFollowing(uid, userId, 20)
        .then(newFollowing => {
          if (!newFollowing) {
            setFollowingLoaded(false);
          } else {
            setFollowingLoaded(true);
          }
          setFollowingLoading(false);
          setFollowing(newFollowing);
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
  ]);
  return (
    <div className="user-desc">
      {name && <h2 className="name">{name}</h2>}
      {desc && <h3 className="desc">{desc}</h3>}
      {link && <a href={link}>{linkText}</a>}
      {followersNum && (
        <h4
          data-show={showFollowers && !!followers?.followers}
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
                <Followers followers={followers.followers} />
              )
            ) : (
              <Spinner size="sm" />
            ))}
        </h4>
      )}
      {followingNum && (
        <h4
          data-show={showFollowing && !!following?.following}
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
                <Followers followers={following.following} />
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
