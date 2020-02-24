import React from 'react';
import {Box, Text} from 'grommet';
import {StatusCritical, Clock} from 'grommet-icons';
import Chart from './chart';
import Since from './since';

const Preview = ({registration: {total, accepted, stored, category, failures, lastCrawl}, ...rest}) => {
  const lastFailure = failures[0];
  return (
    <Box alignContent="between" gap="small" {...rest}>
      <Chart total={total} accepted={accepted} stored={stored} />
      <Box direction="row" gap="small">
        {lastCrawl && <Since Icon={Clock} color="neutral-1" date={lastCrawl} />}
        {lastFailure && <Since Icon={StatusCritical} color="status-warning" date={lastFailure.created} />}
      </Box>
      <Text>{category}</Text>
    </Box>
  );
};

export default Preview;
