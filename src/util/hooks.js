import { useRef, useState, useEffect, useCallback } from "react";
import { set, get } from "idb-keyval";
import Util from "./util";

export const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export const usePersistedState = (keyToPersistWith, defaultState) => {
  const [state, setState] = useState(undefined);

  useEffect(() => {
    get(keyToPersistWith).then(retrievedState =>
      // If a value is retrieved then use it; otherwise default to defaultValue
      setState(retrievedState ?? defaultState)
    );
  }, [keyToPersistWith, setState, defaultState]);

  const setPersistedValue = useCallback(
    newValue => {
      setState(newValue);
      set(keyToPersistWith, newValue);
    },
    [keyToPersistWith, setState]
  );
  return [state, setPersistedValue];
};

export const useMultipleKeys = func => {
  useEffect(() => {
    var keys = [];

    const keydownList = document.addEventListener(
      "keydown",
      function (e) {
        keys = keys || [];
        keys[e.keyCode] = true;

        if (keys[17] && keys[16] && keys[70]) {
          console.log("sucessfull");
          func();
        }
      },
      false
    );

    const keyupList = document.addEventListener(
      "keyup",
      function (e) {
        keys[e.keyCode] = false;
      },
      false
    );

    return () => {
      document.removeEventListener("keyup", keyupList);
      document.removeEventListener("keydown", keydownList);
    };
  });
};

export const useLogin = (
  isLoading,
  isLoggedIn,
  username,
  password,
  setIsLoggedIn,
  setIsLoading,
  setError,
  uid
) => {
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
  }, [
    isLoading,
    isLoggedIn,
    username,
    password,
    setIsLoggedIn,
    setError,
    setIsLoading,
    uid,
  ]);

  const onLogin = e => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  };

  return [onLogin];
};
