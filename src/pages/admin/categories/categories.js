import React from 'react';
import {Box} from 'grommet';
import {useConfigSelector} from 'providers/config/selectors';
import Category from './category';

const Categories = props => {
  const {categories} = useConfigSelector();

  return (
    <Box gap="medium" {...props}>
      {categories.map(category => (
        <Category key={category} category={category} />
      ))}
    </Box>
  );
};

export default Categories;
