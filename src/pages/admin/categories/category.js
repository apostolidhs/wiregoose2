import React, {useMemo} from 'react';
import {Box} from 'grommet';
import Registrations from 'components/admin/registrations';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import Header from './header';

const Category = ({category, expanded, onExpand, ...rest}) => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  const registrations = useMemo(
    () =>
      ids
        .filter(id => byId[id].category === category)
        .sort((a, b) => (a === 'new' ? -1 : 1))
        .map(id => byId[id]),
    [byId]
  );

  return (
    <Box gap="small" border={{color: 'light-3'}} pad="small" {...rest}>
      <Header category={category} onExpand={onExpand} />
      {registrations.length > 0 && (
        <Registrations expanded={expanded} onExpand={onExpand} registrations={registrations} />
      )}
    </Box>
  );
};

export default Category;
