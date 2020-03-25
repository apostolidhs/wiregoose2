import React from 'react';
import {Box} from 'grommet';
import CategoryList from './categories';

const Categories = () => {
  return (
    <Box gap="medium" margin={{top: 'medium', right: 'medium'}}>
      <CategoryList />
    </Box>
  );
};

export default Categories;
