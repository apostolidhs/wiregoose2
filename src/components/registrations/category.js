import React, {useMemo} from 'react';
import {Box, Text} from 'grommet';
import {Link} from '@reach/router';
import {CategoryIcon, CategoryName} from 'components/categories';
import ProviderIcon from 'components/providers/icon';

const getCategoryLink = category => {
  const CategoryLink = ({children, className}) => (
    <Link to={`/category/${category}`} title={category} className={className}>
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
      <Text size="xlarge">
        <CategoryName name={category} />
      </Text>
    </Box>
  );
};

const Provider = ({category, name, icon}) => {
  return (
    <Link to={`/source/${name}/${category}`} title={name}>
      <ProviderIcon src={icon} />
    </Link>
  );
};

const Providers = ({category, providers}) => (
  <Box gap="small" direction="row" margin={{left: '36px'}}>
    {providers.map(provider => (
      <Provider key={provider.name} category={category} {...provider} />
    ))}
  </Box>
);

const Category = ({category, providers}) => {
  return (
    <Box gap="small">
      <CategoryTitle category={category} />
      <Providers category={category} providers={providers} />
    </Box>
  );
};

export default Category;
