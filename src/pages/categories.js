import React, {useEffect, useState, useMemo, lazy, Suspense, useCallback} from 'react';
import {navigate} from '@reach/router';
import useIntl from 'providers/localization/useIntl';
import {useNotification} from 'providers/notifications';
import {CategoryIcon, useCategoryName} from 'components/categories';
import {useConfigSelector} from 'providers/config/selectors';
import {useApiSelector} from 'providers/api/selectors';
import {useFeedCategory, useFeedDispatch} from 'providers/feeds/selectors';
import {useAdSense} from 'providers/adsense';
import getInitialFeedState from 'providers/feeds/getInitialFeedState';
import TextedIcon from 'components/textedIcon';
import Helmet from 'components/helmet';
import Back from 'components/back';
import Main from 'components/main';

const Timeline = lazy(() => import(/* webpackChunkName: 'components.timeline' */ 'components/timeline'));

const limit = 15;

const getOlder = feeds => {
  const feed = feeds[feeds.length - 1];
  return feed && feed.id;
};

let fbDisplayedCategory = false;

const Categories = ({category}) => {
  const isAll = category === 'all';
  const t = useIntl();
  const notification = useNotification();
  const {categories} = useConfigSelector();
  const getCategoryName = useCategoryName();
  const api = useApiSelector();
  const {feeds, loaded, loading, lastClickedId} = useFeedCategory(category);
  const {categoryFetchStarted, categoryFetchFinished, categoryFetchFailed, categoryFeedClicked} = useFeedDispatch();
  const [target, setTarget] = useState();
  const [hasMore, setHasMore] = useState(false);
  const hasAdBlocked = useAdSense();

  useMemo(() => {
    if (!isAll && !categories.includes(category)) navigate('/');
    setTarget();
  }, [category]);

  useEffect(() => {
    setHasMore(feeds.length > 0 && Number.isInteger(feeds.length % limit));
  }, [feeds]);

  useEffect(() => {
    if (!target && feeds.length) return;

    categoryFetchStarted(category);
    const promise = api.timelineExplore({target, limit, ...(!isAll && {categories: [category]})});

    promise
      .then(({data: {feeds}}) => categoryFetchFinished(category, feeds))
      .catch(error => {
        categoryFetchFailed(category);
        notification.server(error);
      });

    return () => promise.abort();
  }, [target, category]);

  const feedsWithAdv = useMemo(() => {
    if (!fbDisplayedCategory) {
      fbDisplayedCategory = category;
    }
    if (!loaded || feeds.length < 10 || fbDisplayedCategory !== category) return feeds;

    const updatedFeeds = [...feeds];

    const fbFeed = {...getInitialFeedState(), type: 'fb'};
    updatedFeeds.splice(8, 1, fbFeed);

    if (feeds.length > 40) {
      updatedFeeds.splice(38, 1, fbFeed);
    }

    if (!hasAdBlocked) {
      const adSenceFeed = {...getInitialFeedState(), type: 'adSence'};
      updatedFeeds.splice(5, 1, adSenceFeed);

      if (feeds.length > 60) {
        updatedFeeds.splice(54, 1, fbFeed);
      }
    }

    return updatedFeeds;
  }, [loaded, feeds, hasAdBlocked]);

  const [hasScroll, setScroll] = useState(false);
  const onScroll = useCallback(() => setScroll(true), []);
  const scrollToIndex = useMemo(
    () => (lastClickedId ? feedsWithAdv.findIndex(({id}) => id === lastClickedId) : -1),
    []
  );
  const feedProps = useMemo(() => ({onClick: id => categoryFeedClicked(category, id)}), [category]);

  const loadMoreItems = () => {
    if (loading || !loaded) return;
    setTarget(getOlder(feedsWithAdv));
  };

  const Icon = useCallback(props => <CategoryIcon name={category} {...props} />, [category]);
  const categoryName = getCategoryName(category);

  return (
    <Main height="100%" width="100%">
      <Helmet
        title={`${categoryName} - Wiregoose`}
        description={t(`category.description${isAll ? '.all' : ''}`, {category: categoryName})}
        keywords={['νέα', 'ειδήσεις', categoryName]}
      />
      {!isAll && <Back absolute noLabel />}
      {!isAll && <TextedIcon Icon={Icon}>{categoryName}</TextedIcon>}
      <Suspense fallback={null}>
        <Timeline
          feeds={feedsWithAdv}
          loadMoreItems={loadMoreItems}
          hasMore={hasMore}
          loading={loading}
          feedProps={feedProps}
          onScroll={onScroll}
          scrollToIndex={hasScroll ? -1 : scrollToIndex}
        />
      </Suspense>
    </Main>
  );
};

export default Categories;
