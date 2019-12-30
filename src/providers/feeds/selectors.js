import {useContext, useMemo} from 'react';
import FeedContext, {FeedDispatch} from './context';
import {initialBucket} from './getDispatch';

export const useFeedCategory = name => {
  const {categories, feeds} = useContext(FeedContext);
  const category = (categories && categories[name]) || initialBucket;
  return useMemo(
    () => ({
      ...category,
      feeds: category.ids.map(id => feeds[id])
    }),
    [category]
  );
};

export const useFeedDispatch = () => useContext(FeedDispatch);
