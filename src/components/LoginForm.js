import React from "react";
import Spinner from "./Spinner";
import "./LoginForm.css";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  onLogin,
  error,
  isLoading,
}) => {
  return (
    <div className="container">
      <div className="login">
        <h1 className="login-header">Login</h1>
        <form className="login-form">
          <input
            autoFocus
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={onLogin} type="submit">
            Login
          </button>
        </form>
        {error && <h2 className="login-error">{error}</h2>}
        {isLoading && <Spinner size="md" />}
      </div>
    </div>
  );
};

export default LoginForm;
