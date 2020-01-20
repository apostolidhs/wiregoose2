import React from 'react';
import {Main, Heading, Text, Box} from 'grommet';
import {Hadoop} from 'grommet-icons';
import {Link} from '@reach/router';
// import Link from 'components/link';
const getLink = path => props => <Link to={`/settings/${path}`} {...props} />;

const SettingsLink = ({path, Icon, children, ...rest}) => (
  <Box direction="row" gap="small" align="center" margin={{top: 'large'}} as={getLink(path)} {...rest}>
    <Icon size="large" />
    <Text size="xlarge">{children}</Text>
  </Box>
);

const Settings = () => {
  return (
    <Main pad="large">
      <Heading level="1" margin="none">
        Όλα τα νέα σε ένα μέρος
      </Heading>
      <SettingsLink path="providers" Icon={Hadoop}>
        Πάροχοι
      </SettingsLink>
      <SettingsLink path="about" Icon={Hadoop}>
        Σχετικά
      </SettingsLink>
      <SettingsLink path="creators" Icon={Hadoop}>
        Δημιουργοί
      </SettingsLink>
      <SettingsLink path="language" Icon={Hadoop}>
        English
      </SettingsLink>
    </Main>
  );
};

export default Settings;
