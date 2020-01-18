import React, {useState, useMemo} from 'react';
import getDispatch, {initialState} from './getDispatch';
import Context, {FeedDispatch} from './context';

const getInitialState = () => initialState;

const FeedProvider = ({children}) => {
  const [state, setState] = useState(getInitialState);
  const dispatch = useMemo(() => getDispatch(setState), []);

  return (
    <FeedDispatch.Provider value={dispatch}>
      <Context.Provider value={state}>{children}</Context.Provider>
    </FeedDispatch.Provider>
  );
};

export default FeedProvider;
