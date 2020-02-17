import React, {useEffect, useState, useMemo, lazy, Suspense} from 'react';
import {navigate} from '@reach/router';
import {Edit} from 'grommet-icons';
import {CategoryName} from 'components/categories';
import {useConfigSelector} from 'providers/config/selectors';
import {useApiSelector} from 'providers/api/selectors';
import {useFeedCategory, useFeedDispatch} from 'providers/feeds/selectors';
import TextedIcon from 'components/textedIcon';
import Back from 'components/back';
import Main from 'components/main';

const Timeline = lazy(() => import(/* webpackChunkName: 'components.timeline' */ 'components/timeline'));

const limit = 15;

const getOlder = feeds => {
  const feed = feeds[feeds.length - 1];
  return feed && feed.id;
};

const Categories = ({category}) => {
  const {categories} = useConfigSelector();
  const api = useApiSelector();
  const {feeds, loaded, loading} = useFeedCategory(category);
  const {categoryFetchStarted, categoryFetchFinished, categoryFetchFailed} = useFeedDispatch();
  const [target, setTarget] = useState();
  const [hasMore, setHasMore] = useState(false);

  useMemo(() => {
    if (!categories.includes(category) && category) navigate('/');
    setTarget();
  }, [category]);

  useEffect(() => {
    setHasMore(feeds.length > 0 && Number.isInteger(feeds.length % limit));
  }, [feeds]);

  useEffect(() => {
    if (!target && feeds.length) return;

    categoryFetchStarted(category);
    const promise = api.timelineExplore({target, limit, ...(category && {categories: [category]})});

    promise
      .then(({data: {feeds}}) => categoryFetchFinished(category, feeds))
      .catch(error => categoryFetchFailed(category));

    return () => promise.abort();
  }, [target, category]);

  const loadMoreItems = () => {
    if (loading || !loaded) return;
    setTarget(getOlder(feeds));
  };

  return (
    <Main height="100%" width="100%">
      {category && <Back absolute noLabel />}
      {category && (
        <TextedIcon Icon={Edit}>
          <CategoryName name={category} />
        </TextedIcon>
      )}
      <Suspense fallback={null}>
        <Timeline feeds={feeds} loadMoreItems={loadMoreItems} hasMore={hasMore} loading={loading} />
      </Suspense>
    </Main>
  );
};

export default Categories;
