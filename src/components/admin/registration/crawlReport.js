import React from 'react';
import {Box, Text} from 'grommet';
import Feed from 'components/feed';
import ArticleMinning from './articleMinning';

const CrawlReport = ({resourceId, feeds, total, ...rest}) => {
  return (
    <Box gap="small" {...rest}>
      <Text>
        {feeds.length}/{total} successful feeds
      </Text>
      <Box gap="medium" overflow="auto" height={{max: '600px'}} border={{side: 'top', color: 'light-5'}}>
        {feeds.map(feed => (
          <Box gap="small" key={feed.id} height={{min: 'initial'}} border={{side: 'bottom', color: 'light-6'}}>
            <Feed feed={feed} />
            <ArticleMinning
              pad={{vertical: 'small'}}
              border={{side: 'top', color: 'light-3'}}
              resourceId={resourceId}
              link={feed.link}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CrawlReport;
