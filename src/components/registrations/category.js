import React, {useMemo} from 'react';
import {Box, Text} from 'grommet';
import {Link as RouterLink} from '@reach/router';
import {CategoryIcon, CategoryName, useCategoryName} from 'components/categories';
import ProviderIcon from 'components/providers/icon';
import Link from 'components/sidebar/link';

const Provider = ({category, name, icon}) => {
  return (
    <RouterLink to={`/source/${name}/${category}`} title={name}>
      <ProviderIcon src={icon} />
    </RouterLink>
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
  const categoryName = useCategoryName();
  const Icon = () => <CategoryIcon name={category} />;
  return (
    <Box gap="small">
      <Link to={`/category/${category}`} title={categoryName(category)} Icon={Icon}>
        <CategoryName name={category} />
      </Link>
      <Providers category={category} providers={providers} />
    </Box>
  );
};

export default Category;
