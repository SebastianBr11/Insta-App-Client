import React from "react";
import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div className="container">
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
