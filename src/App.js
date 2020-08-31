import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import PWAButton from "./components/PWAButton";

function App() {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", e => {
      console.log("before install prompt event");
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setPrompt(e);
    });
  });
  return (
    <div className="container">
      {/* {prompt != null && <PWAButton {...{ setPrompt, prompt }} />} */}
      <PWAButton {...{ setPrompt, prompt }} />
      <header className="header">
        <h1>Instagram APP</h1>
      </header>
      <div className="body">
        <Search />
      </div>
    </div>
  );
}

export default App;
