import React, {useMemo} from 'react';
import {Box, Heading} from 'grommet';
import {useRegistrationsSelector} from 'providers/admin/registrations';
import Registrations from 'components/admin/registrations';
import Progress from './progress';

const LastCrawled = () => {
  const {byId, ids, lastCrawl} = useRegistrationsSelector(({byId, ids}) => ({byId, ids}));
  const registrationIds = useMemo(
    () => [...ids].sort((a, b) => byId[b].lastCrawl.getTime() - byId[a].lastCrawl.getTime()).slice(0, 4),
    [byId]
  );

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
