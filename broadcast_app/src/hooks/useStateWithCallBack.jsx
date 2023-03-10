import { useCallback, useEffect, useRef, useState } from "react";

function useStateWithCallBack(initialState) {
  const [state, setState] = useState(initialState);

  /***_______   use useRef as a store  ________**/
  const cbRef = useRef();

  /***_______  Create Own Custom update state fun   ________**/

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;
    setState((prev) => {
      return typeof newState === "function" ? newState(prev) : newState;
    });
  }, []);
  /***_______  Callback   ________**/
  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);
  return [state, updateState];
}

export default useStateWithCallBack;
