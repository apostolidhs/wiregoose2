import React, {useMemo} from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import List from 'react-virtualized/dist/commonjs/List';
import Feed from 'components/feed';
import Skeleton from 'components/feed/skeleton';
import 'react-virtualized/styles.css';

const feedProps = {
  height: '450px',
  pad: {horizontal: 'small', vertical: 'medium'},
  border: {
    color: 'light-4',
    side: 'bottom'
  },
  width: {max: '450px'},
  margin: {horizontal: 'auto'}
};

const getListItem = feeds => ({index, key, style}) => {
  const feed = feeds[index];
  return (
    <div key={key} style={style}>
      {feed ? <Feed feed={feed} {...feedProps} /> : <Skeleton {...feedProps} />}
    </div>
  );
};

const Timeline = ({feeds, loadMoreItems, hasMore, loading}) => {
  const ListItem = useMemo(() => getListItem(feeds), [feeds]);
  const itemCount = hasMore ? feeds.length + 1 : feeds.length;
  const isRowLoaded = ({index}) => feeds && index < feeds.length;

  return (
    <WindowScroller>
      {({height, isScrolling, registerChild: windowRegisterChild, onChildScroll, scrollTop}) => (
        <div style={{flex: '1 1 auto'}}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={hasMore ? loadMoreItems : () => {}}
            rowCount={itemCount}>
            {({onRowsRendered, registerChild}) => (
              <AutoSizer disableHeight>
                {({width}) => (
                  <div ref={windowRegisterChild}>
                    <List
                      ref={registerChild}
                      autoHeight
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      onRowsRendered={onRowsRendered}
                      overscanRowCount={2}
                      rowCount={itemCount}
                      rowHeight={450}
                      rowRenderer={ListItem}
                      scrollTop={scrollTop}
                      width={width}
                    />
                  </div>
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </div>
      )}
    </WindowScroller>
  );
};

export default Timeline;
