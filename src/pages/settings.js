import React from 'react';
import {Text, Box} from 'grommet';
import {Announce, Info, Edit} from 'grommet-icons';
import {Link} from '@reach/router';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';

const SettingsLink = ({path, Icon, children, ...rest}) => (
  <Link to={`/settings/${path}`}>
    <Box direction="row" gap="small" align="center" {...rest}>
      <Icon size="38px" color="dark-1" />
      <Text size="large">{children}</Text>
    </Box>
  </Link>
);

const Settings = () => {
  return (
    <Main>
      <Back absolute />
      <TextedIcon> Όλα τα νέα σε ένα μέρος</TextedIcon>
      <Box pad={{horizontal: 'medium', vertical: 'large'}} gap="large">
        <SettingsLink path="about" Icon={Info}>
          Σχετικά
        </SettingsLink>
        <SettingsLink path="providers" Icon={Announce}>
          Πηγές
        </SettingsLink>
        <SettingsLink path="credits" Icon={Edit}>
          Δημιουργοί
        </SettingsLink>
      </Box>
    </Main>
  );
};

export default Settings;
