import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {navigate} from '@reach/router';
import styled from 'styled-components';
import {Box, Tabs, Tab} from 'grommet';
import {Edit} from 'grommet-icons';
import Timeline from 'components/timeline';
import {useConfigSelector} from 'providers/config/selectors';
import {useApiSelector} from 'providers/api/selectors';
import {useFeedCategory, useFeedDispatch} from 'providers/feeds/selectors';
import {useSelectCategoriesByProvider, useSelectProvider} from 'providers/registrations/selectors';
import Back from 'components/back';
import Main from 'components/main';
import Header from './header';

const limit = 15;

const getOlder = feeds => {
  const feed = feeds[feeds.length - 1];
  return feed && feed.id;
};

const StyledTabs = styled(Tabs)`
  > :first-child::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  > :first-child {
    box-shadow: ${props => props.theme.global.elevation[props.theme.dark ? 'dark' : 'light']['xsmall']};
    flex-wrap: nowrap;
    flex-shrink: 0;
    white-space: nowrap;
    overflow-y: hidden;
    width: auto;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
`;

const Category = ({category}) => {
  return <Box pad="medium">{category}</Box>;
};

const Sources = ({source, category}) => {
  const categories = useSelectCategoriesByProvider(source);
  const provider = useSelectProvider(source);

  const tabRef = el => el && el.scrollIntoView({behavior: 'smooth', inline: 'center'});
  const activeIndex = categories.indexOf(category);
  const onActive = useCallback(index => navigate(`/sources/${source}/${categories[index]}`), [categories]);

  return (
    <Main pad="none" height="100%" width="100%">
      <Back absolute noLabel />
      <Header {...provider} />
      <StyledTabs activeIndex={activeIndex} onActive={onActive} flex="grow" justify="start">
        {categories.map((cat, index) => (
          <Tab ref={index === activeIndex ? tabRef : null} key={cat} title={cat}>
            <Category category={cat} />
          </Tab>
        ))}
      </StyledTabs>
    </Main>
  );
  // const {categories} = useConfigSelector();
  // const api = useApiSelector();
  // const {feeds, loaded, loading} = useFeedCategory(category);
  // const {categoryFetchStarted, categoryFetchFinished, categoryFetchFailed} = useFeedDispatch();
  // const [target, setTarget] = useState();
  // const isExplore = category === 'explore';

  // useMemo(() => {
  //   if (!categories.includes(category) && category !== 'explore') navigate('/');
  //   setTarget();
  // }, [category]);

  // useEffect(() => {
  //   categoryFetchStarted(category);
  //   const promise = api.timelineExplore({target, limit, ...(category !== 'explore' && {categories: [category]})});

  //   promise
  //     .then(response => categoryFetchFinished(category, response.data.feeds))
  //     .catch(error => {
  //       console.error(error);
  //       categoryFetchFailed(category);
  //     });

  //   return () => promise.abort();
  // }, [target, category]);

  // const loadMoreItems = () => {
  //   if (loading || !loaded) return;
  //   setTarget(getOlder(feeds));
  // };

  // return (
  //   <Main pad="none" height="100%" width="100%">
  //     {!isExplore && <Back absolute noLabel />}
  //     {!isExplore && <TextedIcon Icon={Edit}>{category}</TextedIcon>}
  //     <Timeline feeds={feeds} loadMoreItems={loadMoreItems} />
  //   </Main>
  // );
};

export default Sources;

//width={{max: '450px'}}
