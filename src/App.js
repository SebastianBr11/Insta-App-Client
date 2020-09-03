import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import PWAButton from "./components/PWAButton";
import { useFocus, useMultipleKeys, usePersistedState } from "./util/hooks";
import Util from "./util/util";
import Spinner from "./components/Spinner";

function App() {
  const [prompt, setPrompt] = useState(null);
  const [inputRef, setFocus] = useFocus();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = usePersistedState("username", "");
  const [password, setPassword] = usePersistedState("password", "");
  const [error, setError] = useState(null);

  useMultipleKeys(setFocus);

  useEffect(() => {
    console.log("in use effect");
    window.addEventListener("beforeinstallprompt", e => {
      console.log("before install prompt event");
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPrompt(e);
    });
  });

  const onLogin = e => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
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
          await Util.tryLogin({ username, password });
          setIsLoggedIn(true);
        } catch (e) {
          setError("wrong username or password");
        }
        setIsLoading(false);
      }
    })();
  }, [isLoading, isLoggedIn, username, password, setIsLoggedIn]);
  return isLoggedIn ? (
    <div className="container">
      {prompt != null && <PWAButton {...{ setPrompt, prompt }} />}
      <header className="header">
        <h1>Instagram APP</h1>
      </header>
      <div className="body">
        <Search refe={inputRef} />
      </div>
    </div>
  ) : (
    <>
      <form>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={onLogin} type="submit">
          login
        </button>
      </form>
      {error && <h1>{error}</h1>}
      {isLoading && <Spinner size="md" />}
    </>
  );
}

export default App;
