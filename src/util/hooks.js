import { useRef, useState, useEffect, useCallback } from "react";
import { set, get } from "idb-keyval";

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
