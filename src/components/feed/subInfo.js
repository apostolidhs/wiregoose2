import React, {useMemo} from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {el} from 'date-fns/locale';
import {Box, Text} from 'grommet';
import {useFeedSelector} from 'providers/feeds/selectors';
import Link from 'components/providers/link';
import {CategoryLink} from 'components/categories';
import Truncate from 'components/truncate';
import {useScreenSize} from 'providers/theme/selectors';

const SubInfo = ({id, ...rest}) => {
  const feed = useFeedSelector(id);
  const {isSmall} = useScreenSize();
  const published = feed && feed.published;
  const date = useMemo(() => {
    if (!published) return null;

    const rawDate = formatDistanceToNow(new Date(published), {locale: el});
    const literals = rawDate.split(' ');

    return literals.length > 2 ? literals.splice(1).join(' ') : rawDate;
  }, [published]);

  if (!feed) return null;
  const {provider, category, author} = feed;
  const minimize = author && author.length > 10;
  const size = minimize ? 'small' : null;

  return (
    <Box direction="row" justify="between" height={{min: 'initial'}} {...rest}>
      <Box direction="row">
        <Link name={provider} category={category} size="32px" />
        <Text alignSelf="center" size={size} color="dark-2" margin={{left: 'small'}}>
          {date}
        </Text>
        {author && (
          <Text alignSelf="center" size={size} color="dark-2">
            ,{' '}
            <Truncate size={isSmall ? 13 : 40} trailing=".">
              {author}
            </Truncate>
          </Text>
        )}
      </Box>
      <CategoryLink category={category} alignSelf="center" color="dark-2" />
    </Box>
  );
};

export default SubInfo;
