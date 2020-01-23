import React, {useMemo} from 'react';
import {FixedSizeList} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import Feed from 'components/feed';
// import useTheme from 'hooks/useTheme';

const getListItem = feeds => ({index, isScrolling, style}) => {
  // const theme = useTheme();
  const feed = feeds[index];

  if (!feed) {
    return (
      <div key={index + ''} style={style}>
        loading...
      </div>
    );
  }
  return (
    <div style={style}>
      <Feed
        key={feed.id}
        feed={feed}
        height="450px"
        pad={{horizontal: 'medium', top: 'medium', bottom: 'small'}}
        border={{
          color: 'light-3',
          side: 'bottom'
        }}
        width={{max: '450px'}}
        margin={{horizontal: 'auto'}}
      />
    </div>
  );
};

const Timeline = ({feeds, loadMoreItems}) => {
  const ListItem = useMemo(() => getListItem(feeds), [feeds]);
  const itemCount = feeds.length + 1;
  const isItemLoaded = index => feeds && index < feeds.length;

  return (
    <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems} threshold={10}>
      {({onItemsRendered, ref}) => (
        <AutoSizer>
          {({height, width}) => (
            <FixedSizeList
              itemCount={itemCount}
              itemSize={450}
              onItemsRendered={onItemsRendered}
              height={height}
              // width={Math.min(width, 450)}
              width={width}
              ref={ref}>
              {ListItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default Timeline;
