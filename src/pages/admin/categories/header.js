import React, {useCallback, useMemo} from 'react';
import {Box, Heading, Button} from 'grommet';
import {AddCircle} from 'grommet-icons';
import {
  useRegistrationSelector,
  useRegistrationAction,
  useRegistrationsChart,
  useRegistrationsSelector
} from 'providers/admin/registrations';
import {CategoryIcon} from 'components/categories';
import Chart from 'components/admin/registration/chart';

const useChart = category => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  const registrationIds = useMemo(() => ids.filter(i => byId[i].category === category), [ids]);
  return useRegistrationsChart(registrationIds);
};

const Header = ({category, onExpand, ...rest}) => {
  const {initializeResource, update} = useRegistrationAction();
  const disabled = useRegistrationSelector('new', resource => !!resource);
  const chart = useChart(category);

  const onCreate = useCallback(() => {
    initializeResource('new', {lang: 'gr', category});
    update('expandedId', 'new');
  }, []);

  return (
    <Box direction="row" justify="between" {...rest}>
      <Box direction="row">
        <Box as={Heading} level="3" margin="none" direction="row" gap="xsmall" {...rest}>
          <Box justify="center">
            <CategoryIcon name={category} />
          </Box>
          {category}
        </Box>
        {chart.total.length > 0 && (
          <Chart
            width="medium"
            margin={{left: 'small'}}
            pad={{left: 'small'}}
            border={{side: 'left', color: 'light-3'}}
            {...chart}
          />
        )}
      </Box>
      <Button
        icon={<AddCircle size="32px" color="brand" />}
        plain
        gap="xsmall"
        onClick={onCreate}
        disabled={disabled}
      />
    </Box>
  );
};

export default Header;
