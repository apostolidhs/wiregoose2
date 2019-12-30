import React from 'react';
import {Box, Text} from 'grommet';
import CategoryIcon from 'components/categories/icon';
import ProviderIcon from 'components/providers/icon';

const CategoryTitle = ({category}) => (
  <Box gap="small" direction="row">
    <Box justify="center">
      <CategoryIcon name={category} />
    </Box>
    <Text size="xlarge">{category}</Text>
  </Box>
);

const Providers = ({providers}) => (
  <Box gap="small" direction="row" margin={{left: '36px'}}>
    {providers.map(({icon, name}) => (
      <ProviderIcon key={name} src={icon} />
    ))}
  </Box>
);

const Category = ({category, providers}) => {
  return (
    <Box gap="medium">
      <CategoryTitle category={category} />
      <Providers providers={providers} />
    </Box>
  );
};

export default Category;
