import { useState, useCallback, useRef } from 'react';
import isFunction from 'lodash/isFunction';

const useReducer = ({ reducer, initialArg = {}, init }) => {
  const [, forceUpdate] = useState(0);
  const state = useRef(isFunction(init) ? init(initialArg) : initialArg);

  const dispatch = useCallback((action) => {
    const oldState = state.current;

    state.current = reducer(oldState, action);

    if (oldState !== state.current) forceUpdate((value) => value + 1);
  }, [reducer]);

  return [state, dispatch];
};

export default useReducer;
