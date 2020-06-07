import React, {useMemo} from 'react';
import noop from 'lodash/noop';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import List from 'react-virtualized/dist/commonjs/List';
import Feed from 'components/feed';
import FB from 'components/fb';
import AdSense from 'components/adSense';
import Skeleton from 'components/feed/skeleton';
import 'react-virtualized/styles.css';

const defaultFeedProps = {
  height: '450px',
  pad: {horizontal: 'small', vertical: 'medium'},
  border: {
    color: 'light-3',
    side: 'bottom'
  },
  width: {max: '450px'},
  margin: {horizontal: 'auto'}
};

const byType = {
  feed: Feed,
  fb: FB,
  adSence: AdSense,
  default: Skeleton
};

const getListItem = (feeds, {onClick = noop, ...feedProps}) => ({index, key, style}) => {
  const feed = feeds[index];
  const click = () => onClick(feed.id);

  const Component = feed ? byType[feed.type] : byType.default;
  return (
    <div key={key} style={style}>
      <Component feed={feed} onClick={click} {...defaultFeedProps} {...feedProps} />
    </div>
  );
};

const Timeline = ({feeds, loadMoreItems, hasMore, feedProps, onScroll, ...rest}) => {
  const ListItem = useMemo(() => getListItem(feeds, feedProps), [feeds]);
  const itemCount = hasMore ? feeds.length + 1 : feeds.length;
  const isRowLoaded = ({index}) => feeds && index < feeds.length;

  return (
    <WindowScroller onScroll={onScroll}>
      {({height, isScrolling, registerChild: windowRegisterChild, onChildScroll, scrollTop}) => (
        <div style={{flex: '1 1 auto'}}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={hasMore ? loadMoreItems : noop}
            rowCount={itemCount}
            threshold={10}>
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
                      {...rest}
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
