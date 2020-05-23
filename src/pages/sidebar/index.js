import React, {forwardRef} from 'react';
import {Box} from 'grommet';
import {Menu} from 'grommet-icons';
import Link from 'components/sidebar/link';
import Content from './content';

const Sidebar = forwardRef((props, ref) => {
  return (
    <Box direction="column" height="100%" ref={ref} {...props}>
      <Box pad={{bottom: 'small'}}>
        <Link to={`/settings`} Icon={Menu} title="Μενού">
          Μενού
        </Link>
      </Box>
      <Content margin={{top: 'medium'}} />
    </Box>
  );
});

export default Sidebar;
