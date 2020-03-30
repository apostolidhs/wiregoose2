import React, {useMemo} from 'react';
import {Box, Heading} from 'grommet';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import Registrations from 'components/admin/registrations';
import Progress from './progress';

const getTime = ({lastCrawl}) => (lastCrawl ? lastCrawl.getTime() : 0);

const LastCrawled = () => {
  const {byId, ids} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  const registrationIds = useMemo(() => [...ids].sort((a, b) => getTime(byId[b]) - getTime(byId[a])).slice(0, 4), [
    byId
  ]);

  return (
    <Box gap="small">
      <Box direction="row" justify="between" gap="small">
        <Heading level="3" margin="none">
          Last Crawled
        </Heading>
        <Progress />
      </Box>
      <Box border={{color: 'light-3'}} pad="small">
        <Registrations ids={registrationIds} provider category />
      </Box>
    </Box>
  );
};

export default LastCrawled;
