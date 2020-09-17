import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import PWAButton from "./components/PWAButton";
import {
  useFocus,
  useMultipleKeys,
  usePersistedState,
  useLogin,
  useUUID,
} from "./util/hooks";
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
  const [uid] = useUUID();
  const [onLogin] = useLogin(
    isLoading,
    isLoggedIn,
    username,
    password,
    setIsLoggedIn,
    setIsLoading,
    setError,
    uid
  );

  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  useMultipleKeys(setFocus);

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

  const onLogout = async () => {
    console.log("logging out");
    await Util.logout(uid);
    setIsLoggedIn(false);
    console.log("is logged in: " + isLoggedIn);
  };

  useEffect(() => {
    if (isDarkModeActive)
      document.querySelector(":root").classList.add("dark-mode");
    else document.querySelector(":root").classList.remove("dark-mode");
  }, [isDarkModeActive]);

  return isLoggedIn ? (
    <div className="container">
      <button onClick={() => setIsDarkModeActive(!isDarkModeActive)}>
        Dark Mode
      </button>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
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
