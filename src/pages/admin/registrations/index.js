import React, {useMemo, useCallback, useState} from 'react';
import {Box, Select} from 'grommet';
import sum from 'lodash/sum';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import RegistrationList from 'components/admin/registrations';

const lessFeeds = 'Less Feeds';
const mostFeeds = 'Most Feeds';
const mostErrors = 'Most Errors';

const options = [lessFeeds, mostFeeds, mostErrors];

const handlers = {
  [lessFeeds]: (ids, byId) => [...ids].sort((a, b) => byId[a].storedAverage - byId[b].storedAverage),
  [mostFeeds]: (ids, byId) => [...ids].sort((a, b) => byId[b].storedAverage - byId[a].storedAverage),
  [mostErrors]: (ids, byId) => [...ids].sort((a, b) => byId[b].failures.length - byId[a].failures.length)
};

const Registrations = () => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  const [value, setValue] = useState(mostErrors);

  const statsById = useMemo(
    () =>
      ids.reduce((h, id) => {
        const {stored} = byId[id];
        return {...h, [id]: {...byId[id], storedAverage: sum(stored) / stored.length}};
      }, {}),
    [ids]
  );
  const sortedIds = useMemo(() => handlers[value](ids, statsById), [value, ids]);

  const onChange = useCallback(({option}) => setValue(option), []);

  return (
    <Box gap="medium" margin={{top: 'small'}}>
      <Select options={options} value={value} onChange={onChange} />
      <RegistrationList ids={sortedIds} category provider />
    </Box>
  );
};

export default Registrations;
