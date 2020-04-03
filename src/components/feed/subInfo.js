import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {el} from 'date-fns/locale';
import {Box, Text} from 'grommet';
import {useSelectProvider} from 'providers/registrations/selectors';
import ProviderIcon from 'components/providers/icon';
import {CategoryName} from 'components/categories';

const emptyObject = {};

const SubInfo = ({provider, published, category, ...rest}) => {
  const {icon} = useSelectProvider(provider) || emptyObject;

  return (
    <Box direction="row" justify="between" height={{min: 'initial'}} {...rest}>
      <Box direction="row">
        <ProviderIcon src={icon} size="32px" />
        <Text alignSelf="center" color="dark-2" margin={{left: 'small'}}>
          {formatDistanceToNow(new Date(published), {locale: el})}
        </Text>
      </Box>
      <Text alignSelf="center" color="dark-2">
        <CategoryName name={category} />
      </Text>
    </Box>
  );
};

export default SubInfo;
