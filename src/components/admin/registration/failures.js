import React, {useMemo} from 'react';
import {List} from 'grommet';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Failures = ({failures}) => {
  const data = useMemo(
    () => failures.map(({created, message}) => ({created: formatDistanceToNow(new Date(created)), message})),
    [failures]
  );
  return <List data={data} primaryKey="created" secondaryKey="message" pad="xxsmall" />;
};

export default Failures;
