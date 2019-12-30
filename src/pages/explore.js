import React, {useEffect, useState, useMemo} from 'react';
import {Box} from 'grommet';
import {useApiSelector} from 'providers/api/selectors';
import {useFeedCategory, useFeedDispatch} from 'providers/feeds/selectors';
import Feed from 'components/feed';

import {FixedSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

const step = 15;

const getOlder = feeds => {
  const feed = feeds[feeds.length - 1];
  return feed && feed.id;
};

const getListItem = feeds => ({index, isScrolling, style}) => {
  const feed = feeds[index];
  if (!feed)
    return (
      <div key={index + ''} style={style}>
        loading...
      </div>
    );
  return (
    <Feed
      key={feed.id}
      feed={feed}
      height="450px"
      pad={{horizontal: 'medium', top: 'medium', bottom: 'small'}}
      border={{
        color: 'light-3',
        side: 'bottom'
      }}
      style={style}
    />
  );
};

const Explore = () => {
  const api = useApiSelector();
  const {feeds, loaded, loading} = useFeedCategory('explore');
  const {categoryFetchStarted, categoryFetchFinished, categoryFetchFailed} = useFeedDispatch();
  const [target, setTarget] = useState();

  useEffect(() => {
    console.log('rerender');
    return () => console.log('unmount Explore');
  }, []);

  useEffect(() => {
    categoryFetchStarted('explore');
    const promise = api.timelineExplore(target, step);

    promise
      .then(response => {
        // setTimeout(() => categoryFetchFinished('explore', response.data.feeds), 0);
        // debugger;
        categoryFetchFinished('explore', response.data.feeds);
      })
      .catch(error => {
        console.error(error);
        categoryFetchFailed('explore');
        // if (error.name === 'AbortError') return; // todo
      });

    return () => {
      promise.abort();
    };
  }, [target]);

  const ListItem = useMemo(() => getListItem(feeds), [feeds]);

  const loadMoreItems = (startIndex, stopIndex) => {
    // console.log('loadMoreItems', loading, loaded, startIndex, stopIndex);
    if (loading || !loaded) return;
    setTarget(getOlder(feeds));
  };
  const itemCount = feeds.length + 1;
  const isItemLoaded = index => {
    return feeds && index < feeds.length;
  };

  return (
    <Box height="100%">
      <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems} threshold={10}>
        {({onItemsRendered, ref}) => {
          return (
            <AutoSizer>
              {({height, width}) => {
                return (
                  <FixedSizeList
                    itemCount={itemCount}
                    itemSize={450}
                    onItemsRendered={onItemsRendered}
                    height={height}
                    width={width}
                    ref={ref}>
                    {ListItem}
                  </FixedSizeList>
                );
              }}
            </AutoSizer>
          );
        }}
      </InfiniteLoader>
    </Box>
  );
};

export default Explore;
