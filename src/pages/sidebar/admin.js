import React from 'react';
import {Box} from 'grommet';
import {Menu} from 'grommet-icons';
import Link from 'components/sidebar/link';

const Admin = props => (
  <Box direction="column" gap="small" height={{min: 'auto'}} border={{side: 'bottom', color: 'light-3'}} {...props}>
    <Link to={`/admin`} Icon={Menu} title="Registrations">
      Registrations
    </Link>
    <Link to={`/admin/providers`} Icon={Menu} title="Providers">
      Providers
    </Link>
  </Box>
);

export default Admin;
