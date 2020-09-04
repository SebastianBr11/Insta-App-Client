import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { set, get } from "idb-keyval";
import "./App.css";
import Search from "./components/Search";
import PWAButton from "./components/PWAButton";
import { useFocus, useMultipleKeys, usePersistedState } from "./util/hooks";
import Util from "./util/util";
import LoginForm from "./components/LoginForm";

function App() {
  const [prompt, setPrompt] = useState(null);
  const [inputRef, setFocus] = useFocus();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = usePersistedState("username", "");
  const [password, setPassword] = usePersistedState("password", "");
  const [error, setError] = useState(null);
  const [uid, setUid] = useState(uuidv4());

  useMultipleKeys(setFocus);

  useEffect(() => {
    (async () => {
      await get("uid").then(retrievedState => setUid(retrievedState ?? null));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await set("uid", uid);
    })();
  }, [uid]);

  useEffect(() => {
    console.log("in use effect");
    const listener = window.addEventListener("beforeinstallprompt", e => {
      console.log("before install prompt event");
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPrompt(e);
    });

    return () => {
      document.removeEventListener("beforeinstallprompt", listener);
    };
  }, []);

  const onLogin = e => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  };

  const onLogout = async () => {
    console.log("logging out");
    await Util.logout(uid);
    setIsLoggedIn(false);
    console.log("is logged in: " + isLoggedIn);
  };

  useEffect(() => {
    (async () => {
      if (isLoading && !isLoggedIn) {
        if (password.length < 6) {
          setError("the password is too short");
          setIsLoading(false);
          return;
        }
        try {
          await Util.tryLogin(uid, { username, password });
          setIsLoggedIn(true);
        } catch (e) {
          setError("wrong username or password");
        }
        setIsLoading(false);
      }
    })();
  }, [isLoading, isLoggedIn, username, password, setIsLoggedIn, uid]);
  return isLoggedIn ? (
    <div className="container">
      <button onClick={onLogout}>logout</button>
      <header className="header">
        <h1>Instagram APP</h1>
      </header>
      <div className="body">
        <Search uid={uid} refe={inputRef} />
      </div>
      {prompt != null && <PWAButton {...{ setPrompt, prompt }} />}
    </div>
  ) : (
    <LoginForm
      {...{
        username,
        setUsername,
        password,
        setPassword,
        onLogin,
        error,
        isLoading,
      }}
    />
  );
}

export default App;
