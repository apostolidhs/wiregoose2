import React from 'react';
import {Box} from 'grommet';
import CategoryList from './categories';

const Categories = () => {
  return (
    <Box gap="medium" margin={{right: 'medium'}}>
      <CategoryList />
    </Box>
  );
};

export default Categories;
