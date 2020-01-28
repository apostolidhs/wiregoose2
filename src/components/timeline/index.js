import React, {useMemo} from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller';
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader';
import List from 'react-virtualized/dist/commonjs/List';
import Feed from 'components/feed';
// import useTheme from 'hooks/useTheme';
import 'react-virtualized/styles.css';

const getListItem = feeds => ({index, isScrolling, key, style}) => {
  // const theme = useTheme();
  const feed = feeds[index];

  if (!feed) {
    return (
      <div key={key} style={style}>
        loading...
      </div>
    );
  }
  return (
    <div key={key} style={style}>
      <Feed
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

const Timeline = ({feeds, loadMoreItems, hasMore}) => {
  const ListItem = useMemo(() => getListItem(feeds), [feeds]);
  const itemCount = hasMore ? feeds.length + 1 : feeds.length;
  const isRowLoaded = ({index}) => feeds && index < feeds.length;

  return (
    <WindowScroller>
      {({height, isScrolling, registerChild: windowRegisterChild, onChildScroll, scrollTop}) => (
        <div style={{flex: '1 1 auto'}}>
          <InfiniteLoader isRowLoaded={isRowLoaded} loadMoreRows={loadMoreItems} rowCount={itemCount}>
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

// return (
//   <InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems} threshold={10}>
//     {({onItemsRendered, ref}) => (
//       <AutoSizer>
//         {({height, width}) => (
//           <FixedSizeList
//             itemCount={itemCount}
//             itemSize={450}
//             onItemsRendered={onItemsRendered}
//             height={height}
//             // width={Math.min(width, 450)}
//             width={width}
//             ref={ref}>
//             {ListItem}
//           </FixedSizeList>
//         )}
//       </AutoSizer>
//     )}
//   </InfiniteLoader>
// );
