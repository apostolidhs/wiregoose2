import React, {memo, useMemo} from 'react';
import {Box} from 'grommet';
import {useRegistrationsSelector} from 'providers/registrations/selectors';
import RegistrationCategory from 'components/registrations/category';

const Categories = props => {
  const {byCategory} = useRegistrationsSelector();
  return useMemo(
    () => (
      <Box direction="column" gap="small" height={{min: 'auto'}} {...props}>
        {Object.keys(byCategory).map(category => (
          <RegistrationCategory key={category} category={category} providers={byCategory[category]} />
        ))}
      </Box>
    ),
    [byCategory]
  );
};

export default memo(Categories);
