import React, {useMemo} from 'react';
import {Box, Text, Stack, Chart as GChart} from 'grommet';
import max from 'lodash/max';

const ChartLine = ({points, ...rest}) => {
  const values = useMemo(() => points.map((point, index) => [index, point]), [points]);
  return (
    <GChart type="line" values={values} size={{width: 'full', height: '30px'}} thickness="xxsmall" round {...rest} />
  );
};

const Chart = ({total, accepted, stored, ...rest}) => {
  const maxValue = useMemo(() => max(total), [total]);

  return (
    <Box {...rest}>
      <Stack fill>
        <ChartLine points={total} color="accent-2" />
        <ChartLine points={accepted} color="neutral-3" />
        <ChartLine points={stored} color="status-ok" />
        <Box fill justify="between">
          <Box align="start">
            <Text>{maxValue}</Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Chart;
