import React, {useEffect, useState, useMemo} from 'react';
import {navigate} from '@reach/router';
import {Box} from 'grommet';
import {Edit} from 'grommet-icons';
import Timeline from 'components/timeline';
import {useConfigSelector} from 'providers/config/selectors';
import {useApiSelector} from 'providers/api/selectors';
import {useFeedCategory, useFeedDispatch} from 'providers/feeds/selectors';
import TextedIcon from 'components/textedIcon';
import Back from 'components/back';
import Main from 'components/main';

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
  const isExplore = category === 'explore';

  useMemo(() => {
    if (!categories.includes(category) && category !== 'explore') navigate('/');
    setTarget();
  }, [category]);

  useEffect(() => {
    categoryFetchStarted(category);
    const promise = api.timelineExplore({target, limit, ...(category !== 'explore' && {categories: [category]})});

    promise
      .then(response => categoryFetchFinished(category, response.data.feeds))
      .catch(error => {
        console.error(error);
        categoryFetchFailed(category);
      });

    return () => promise.abort();
  }, [target, category]);

  const loadMoreItems = () => {
    if (loading || !loaded) return;
    setTarget(getOlder(feeds));
  };

  return (
    <Main pad="none" height="100%" width="100%">
      {!isExplore && <Back absolute noLabel />}
      {!isExplore && <TextedIcon Icon={Edit}>{category}</TextedIcon>}
      <Timeline feeds={feeds} loadMoreItems={loadMoreItems} />
    </Main>
  );
};

export default Categories;

//width={{max: '450px'}}
