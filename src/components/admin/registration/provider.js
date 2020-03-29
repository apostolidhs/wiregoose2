import React from 'react';
import {Text} from 'grommet';
import {useProviderSelector} from 'providers/admin/providers';
import Pill from 'components/admin/pill';

const Provider = ({id}) => {
  const name = useProviderSelector(id, s => s && s.name);
  return <Pill>{name}</Pill>;
};

export default Provider;
