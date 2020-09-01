import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import PWAButton from "./components/PWAButton";
import { useFocus } from "./util/hooks";

function App() {
  const [prompt, setPrompt] = useState(null);
  const [inputRef, setFocus] = useFocus();

  useEffect(() => {
    console.log("in use effect");
    window.addEventListener("beforeinstallprompt", e => {
      console.log("before install prompt event");
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPrompt(e);
    });

    var keys;

    document.addEventListener(
      "keydown",
      function (e) {
        keys = keys || [];
        keys[e.keyCode] = true;

        if (keys[17] && keys[16] && keys[70]) {
          console.log("sucessfull");
          setFocus();
        }
      },
      false
    );

    document.addEventListener(
      "keyup",
      function (e) {
        keys[e.keyCode] = false;
      },
      false
    );
  });
  return (
    <div className="container">
      {prompt != null && <PWAButton {...{ setPrompt, prompt }} />}
      <header className="header">
        <h1>Instagram APP</h1>
      </header>
      <div className="body">
        <Search refe={inputRef} />
      </div>
    </div>
  );
}

export default App;
