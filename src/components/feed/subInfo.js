import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {el} from 'date-fns/locale';
import {Box, Text} from 'grommet';
import {useFeedSelector} from 'providers/feeds/selectors';
import Link from 'components/providers/link';
import {CategoryLink} from 'components/categories';

const emptyObject = {};

const SubInfo = ({id, ...rest}) => {
  const {provider, published, category, author} = useFeedSelector(id);

  return (
    <Box direction="row" justify="between" height={{min: 'initial'}} {...rest}>
      <Box direction="row">
        <Link name={provider} category={category} size="32px" />
        <Text alignSelf="center" color="dark-2" margin={{left: 'small'}}>
          {formatDistanceToNow(new Date(published), {locale: el})}
        </Text>
        {author && (
          <Text alignSelf="center" color="dark-2">
            , {author}
          </Text>
        )}
      </Box>
      <CategoryLink category={category} alignSelf="center" color="dark-2" />
    </Box>
  );
};

export default SubInfo;
