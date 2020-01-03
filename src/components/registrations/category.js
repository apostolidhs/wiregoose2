import React, {useMemo} from 'react';
import {Box, Text} from 'grommet';
import {Link} from '@reach/router';
import CategoryIcon from 'components/categories/icon';
import ProviderIcon from 'components/providers/icon';

const getCategoryLink = category => {
  const CategoryLink = ({children, className}) => (
    <Link to={`/category/${category}`} className={className}>
      {children}
    </Link>
  );
  return CategoryLink;
};

const CategoryTitle = ({category}) => {
  const CategoryLink = useMemo(() => getCategoryLink(category), [category]);
  return (
    <Box as={CategoryLink} gap="small" direction="row">
      <Box justify="center">
        <CategoryIcon name={category} />
      </Box>
      <Text size="xlarge">{category}</Text>
    </Box>
  );
};

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
