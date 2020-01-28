import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {navigate} from '@reach/router';
import {Tab} from 'grommet';
import Timeline from 'components/timeline';
import {useApiSelector} from 'providers/api/selectors';
import {useFeedSource, useFeedDispatch} from 'providers/feeds/selectors';
import {
  useSelectCategoriesByProvider,
  useSelectProvider,
  useSelectRegistrationsLoaded
} from 'providers/registrations/selectors';
import Back from 'components/back';
import Main from 'components/main';
import Header from './header';
import Tabs from './tabs';

const limit = 15;

const getOlder = feeds => {
  const feed = feeds[feeds.length - 1];
  return feed && feed.id;
};

const Sources = ({source, category}) => {
  const isRegistrationsLoaded = useSelectRegistrationsLoaded();
  const categories = useSelectCategoriesByProvider(source);
  const provider = useSelectProvider(source);

  const tabRef = el => el && el.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'end'});
  const activeIndex = categories.indexOf(category);
  const onActive = useCallback(index => navigate(`/sources/${source}/${categories[index]}`), [categories]);

  const api = useApiSelector();
  const {feeds, loaded, loading} = useFeedSource(source, category);
  const {sourceFetchStarted, sourceFetchFinished, sourceFetchFailed} = useFeedDispatch();
  const [target, setTarget] = useState();
  const [hasMore, setHasMore] = useState(true);

  useMemo(() => {
    if (!categories.length && isRegistrationsLoaded) navigate('/');
    setTarget();
  }, [categories]);

  useEffect(() => {
    sourceFetchStarted(source, category);
    const promise = api.timelineExplore({
      target,
      limit,
      ...(category && {categories: [category]}),
      ...(source && {providers: [source]})
    });

    promise
      .then(({data: {feeds}}) => {
        sourceFetchFinished(source, category, feeds);
        setHasMore(feeds.length === limit);
      })
      .catch(error => {
        console.error(error);
        sourceFetchFailed(source, category);
      });

    return () => promise.abort();
  }, [target, source, category]);

  const loadMoreItems = () => {
    if (loading || !loaded) return;
    setTarget(getOlder(feeds));
  };

  return (
    <Main height="100%" width="100%">
      <Back absolute noLabel />
      <Header {...provider} />
      <Tabs activeIndex={activeIndex} onActive={onActive} flex="grow" justify="start">
        {categories.map((cat, index) => (
          <Tab ref={index === activeIndex ? tabRef : null} key={cat} title={cat}>
            <Timeline feeds={feeds} loadMoreItems={loadMoreItems} hasMore={hasMore} />
          </Tab>
        ))}
      </Tabs>
    </Main>
  );
};

export default Sources;

//width={{max: '450px'}}
