import { useReducer, useEffect } from "react";

function useLocallyPersistedReducer(
  reducer,
  defaultState,
  storageKey,
  init = null
) {
  const hookVars = useReducer(reducer, defaultState, (defaultState) => {
    if (!process.browser) {
      return {};
    }

    const persisted = JSON.parse(localStorage.getItem(storageKey));
    return persisted !== null
      ? persisted
      : init !== null
      ? init(defaultState)
      : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(hookVars[0]));
  }, [storageKey, hookVars[0]]);

  return hookVars;
}

export default useLocallyPersistedReducer;
