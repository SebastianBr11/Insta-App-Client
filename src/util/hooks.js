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
