import React from 'react';
import config from '../../config';
import Context from './context';

const FeedProvider = ({children}) => {
  return <Context.Provider value={config}>{children}</Context.Provider>;
};

export default FeedProvider;
