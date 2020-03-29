import React, {useMemo} from 'react';
import {Box} from 'grommet';
import Registrations from 'components/admin/registrations';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import Header from './header';

const Category = ({category, ...rest}) => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  const registrationIds = useMemo(
    () => ids.filter(id => byId[id].category === category).sort((a, b) => (a === 'new' ? -1 : 1)),
    [ids, category]
  );

  return (
    <Box gap="small" border={{color: 'light-3'}} pad="small" {...rest}>
      <Header category={category} />
      {registrationIds.length > 0 && <Registrations ids={registrationIds} provider />}
    </Box>
  );
};

export default Category;
