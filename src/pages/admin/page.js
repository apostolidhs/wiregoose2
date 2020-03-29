import React from 'react';
import {Box} from 'grommet';
import {Router} from '@reach/router';
import Registrations from './registrations';
import Providers from './providers';
import Categories from './categories';
import useFetch from './useFetch';
import LastCrawled from './lastCrawled';

const Page = () => {
  useFetch();

  return (
    <Box gap="medium" margin={{top: 'medium'}}>
      <LastCrawled />
      <Router>
        <Registrations path="/" />
        <Providers path="/providers" />
        <Categories path="/categories" />
      </Router>
    </Box>
  );
};

export default Page;
