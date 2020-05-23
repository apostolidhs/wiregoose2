import React, {useMemo} from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {el} from 'date-fns/locale';
import {Box, Text} from 'grommet';
import {useFeedSelector} from 'providers/feeds/selectors';
import Link from 'components/providers/link';
import {CategoryLink} from 'components/categories';
import Truncate from 'components/truncate';

const SubInfo = ({id, ...rest}) => {
  const feed = useFeedSelector(id);

  const published = feed && feed.published;
  const date = useMemo(() => {
    if (!published) return null;

    const rawDate = formatDistanceToNow(new Date(published), {locale: el});
    const [estimation, ...literals] = rawDate.split(' ');
    return literals.length > 1 ? literals.join(' ') : rawDate;
  }, [published]);

  if (!feed) return null;
  const {provider, category, author} = feed;

  return (
    <Box direction="row" justify="between" height={{min: 'initial'}} {...rest}>
      <Box direction="row">
        <Link name={provider} category={category} size="32px" />
        <Text alignSelf="center" color="dark-2" margin={{left: 'small'}}>
          {date}
        </Text>
        {author && (
          <Text alignSelf="center" color="dark-2">
            , <Truncate size={20}>{author}</Truncate>
          </Text>
        )}
      </Box>
      <CategoryLink category={category} alignSelf="center" color="dark-2" />
    </Box>
  );
};

export default SubInfo;
