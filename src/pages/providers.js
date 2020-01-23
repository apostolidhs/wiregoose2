import React from 'react';
import {Heading, Anchor, Paragraph, Box} from 'grommet';
import {Announce} from 'grommet-icons';
import {useRegistrationsSelector} from 'providers/registrations/selectors';
import ProviderIcon from 'components/providers/icon';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';

const Provider = ({icon, link, name, ...rest}) => (
  <Box direction="row" gap="small" {...rest}>
    <ProviderIcon src={icon} size="32px" />
    <Anchor href={link} target="_blank" primary alignSelf="center" label={name} />
  </Box>
);

const Providers = () => {
  const {providers} = useRegistrationsSelector();
  return (
    <Main>
      <Back absolute />
      <TextedIcon Icon={Announce}>Πηγές</TextedIcon>
      <Paragraph size="xlarge" margin={{top: 'medium', bottom: 'none'}}>
        Σεβόμαστε τις πηγές που αντλούμε τα νέα. Για αυτόν τον λόγο τονίζουμε με πολύ εμφανή τρόπο την πηγή που
        προέρχεται το νέο. Επίσης δίνουμε την δυνατότητα στον χρήστη της εφαρμογής μας να διαβάσει το νέο απευθείας από
        την πηγή του.
      </Paragraph>
      <Heading level="2" margin={{top: 'large', bottom: 'none'}}>
        Λίστα Πηγών
      </Heading>
      <Box height={{min: 'initial'}} gap="large" margin={{top: 'large'}}>
        {providers.map(provider => (
          <Provider key={provider.name} {...provider} />
        ))}
      </Box>
    </Main>
  );
};

export default Providers;
