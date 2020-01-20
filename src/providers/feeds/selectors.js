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

export const useFeedSelector = id => {
  const {feeds} = useContext(FeedContext);
  return feeds[id];
};

export const useRelatedFeedsSelector = id => {
  const {feeds} = useContext(FeedContext);
  const feed = useFeedSelector(id);
  return useMemo(() => ((feed && feed.relatedIds) || []).map(feedId => feeds[feedId]), [feed]);
};

export const useFeedDispatch = () => useContext(FeedDispatch);
