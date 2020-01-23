import React from 'react';
import {Heading, Text, Box} from 'grommet';
import {Announce, Info, Edit} from 'grommet-icons';
import {Link} from '@reach/router';
import Back from 'components/back';
import Main from 'components/main';

const SettingsLink = ({path, Icon, children, ...rest}) => (
  <Link to={`/settings/${path}`}>
    <Box direction="row" gap="small" align="center" margin={{top: 'large'}} {...rest}>
      <Icon size="38px" color="dark-1" />
      <Text size="large">{children}</Text>
    </Box>
  </Link>
);

const Settings = () => {
  return (
    <Main>
      <Back alignSelf="start" />
      <Heading level="1" margin={{top: 'medium', bottom: 'large'}}>
        Όλα τα νέα σε ένα μέρος
      </Heading>
      <SettingsLink path="about" Icon={Info}>
        Σχετικά
      </SettingsLink>
      <SettingsLink path="providers" Icon={Announce}>
        Πηγές
      </SettingsLink>
      <SettingsLink path="credits" Icon={Edit}>
        Δημιουργοί
      </SettingsLink>
    </Main>
  );
};

export default Settings;
