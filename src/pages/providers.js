import React from 'react';
import {Heading, Anchor, Paragraph, Box} from 'grommet';
import {Rss} from 'grommet-icons';
import {useRegistrationsSelector} from 'providers/registrations/selectors';
import ProviderIcon from 'components/providers/icon';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';
import Helmet from 'components/helmet';

const Provider = ({icon, link, name, ...rest}) => (
  <Box gap="small" width="200px" align="center" {...rest}>
    <ProviderIcon src={icon} size="32px" />
    <Anchor href={link} target="_blank" primary alignSelf="center" label={name} />
  </Box>
);

const Providers = () => {
  const {providers} = useRegistrationsSelector();
  return (
    <Main>
      <Helmet
        title="Πηγές - Wiregoose"
        description="Οι πηγές των νέων"
        keywords={['πηγές', 'νέα', 'ειδήσεις', 'πάροχοι']}
      />
      <Back absolute />
      <TextedIcon Icon={Rss}>Πηγές</TextedIcon>
      <Box pad={{horizontal: 'small', vertical: 'medium'}}>
        <Paragraph size="xlarge" alignSelf="center" margin={{top: 'none', bottom: 'none'}}>
          Σεβόμαστε τις πηγές που αντλούμε τα νέα. Για αυτόν τον λόγο τονίζουμε με πολύ εμφανή τρόπο την πηγή που
          προέρχεται το νέο. Επίσης δίνουμε την δυνατότητα στον χρήστη της εφαρμογής μας να διαβάσει το νέο απευθείας
          από την πηγή του.
        </Paragraph>
        <Heading level="3" margin={{top: 'large', bottom: 'none'}}>
          Λίστα Πηγών
        </Heading>
        <Box direction="row" wrap height={{min: 'initial'}} gap="medium" margin={{top: 'large'}}>
          {providers.map(provider => (
            <Provider key={provider.name} margin={{bottom: 'large'}} {...provider} />
          ))}
        </Box>
      </Box>
    </Main>
  );
};

export default Providers;
