import React, {useEffect, useState, useMemo, useCallback, useRef} from 'react';
import {navigate} from '@reach/router';
import {Tab} from 'grommet';
import {useCategoryName} from 'components/categories';
import Timeline from 'components/timeline';
import {useApiSelector} from 'providers/api/selectors';
import useIntl from 'providers/localization/useIntl';
import {useFeedSource, useFeedDispatch} from 'providers/feeds/selectors';
import {
  useSelectCategoriesByProvider,
  useSelectProvider,
  useSelectRegistrationsLoaded
} from 'providers/registrations/selectors';
import {useNotification} from 'providers/notifications';
import Back from 'components/back';
import Main from 'components/main';
import Helmet from 'components/helmet';
import Header from './header';
import Tabs from './tabs';

const limit = 15;

const getOlder = feeds => {
  const feed = feeds[feeds.length - 1];
  return feed && feed.id;
};

const Sources = ({source, category = 'all'}) => {
  const t = useIntl();
  const notification = useNotification();
  const getCategoryName = useCategoryName();
  const isRegistrationsLoaded = useSelectRegistrationsLoaded();
  const providerCategories = useSelectCategoriesByProvider(source);
  const categories = useMemo(() => ['all', ...providerCategories], [providerCategories]);
  const provider = useSelectProvider(source);

  const activeIndex = categories.indexOf(category);
  const isAll = activeIndex === 0;
  const onActive = useCallback(index => navigate(`/source/${source}/${categories[index]}`), [categories, source]);

  const api = useApiSelector();
  const {feeds, loaded, loading, lastClickedId} = useFeedSource(source, category);
  const {sourceFetchStarted, sourceFetchFinished, sourceFetchFailed, sourceFeedClicked} = useFeedDispatch();
  const [target, setTarget] = useState();
  const [hasMore, setHasMore] = useState(false);

  useMemo(() => {
    if (!providerCategories.length && isRegistrationsLoaded) navigate('/');
    setTarget();
  }, [providerCategories]);

  useEffect(() => {
    setHasMore(feeds.length > 0 && Number.isInteger(feeds.length % limit));
  }, [feeds]);

  useEffect(() => {
    sourceFetchStarted(source, category);
    const promise = api.timelineExplore({
      target,
      limit,
      ...(!isAll && {categories: [category]}),
      ...(source && {providers: [source]})
    });
    promise
      .then(({data: {feeds}}) => sourceFetchFinished(source, category, feeds))
      .catch(error => {
        sourceFetchFailed(source, category);
        notification.server(error);
      });

    return () => promise.abort();
  }, [target, source, category]);

  const loadMoreItems = () => {
    if (loading || !loaded) return;
    setTarget(getOlder(feeds));
  };

  const tabRef = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    if (!isRegistrationsLoaded) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const parentNode = tabRef.current.parentNode;
      parentNode.scrollTo(tabRef.current.offsetLeft - parentNode.offsetWidth / 2, 0);
    }, 500);
  }, [isRegistrationsLoaded, activeIndex]);

  const [hasScroll, setScroll] = useState(false);
  const onScroll = useCallback(() => setScroll(true), []);
  const scrollToIndex = useMemo(() => (lastClickedId ? feeds.findIndex(({id}) => id === lastClickedId) : -1), []);
  const feedProps = useMemo(() => ({onClick: id => sourceFeedClicked(source, category, id)}), [category]);

  const categoryName = getCategoryName(category);

  return (
    <Main height="100%" width="100%">
      <Helmet
        title={`${categoryName} | ${source} - Wiregoose`}
        description={t(`source.description${isAll ? '.all' : ''}`, {category: categoryName, source})}
        keywords={['νέα', 'ειδήσεις', source, categoryName]}
      />
      <Back absolute noLabel />
      <Header {...provider} />
      <Tabs activeIndex={activeIndex} onActive={onActive} flex="grow" justify="start">
        {categories.map((cat, index) => (
          <Tab key={cat} ref={index === activeIndex ? tabRef : null} title={getCategoryName(cat)}>
            <Timeline
              feeds={feeds}
              loadMoreItems={loadMoreItems}
              hasMore={hasMore}
              loading={loading}
              feedProps={feedProps}
              onScroll={onScroll}
              scrollToIndex={hasScroll ? -1 : scrollToIndex}
            />
          </Tab>
        ))}
      </Tabs>
    </Main>
  );
};

export default Sources;
