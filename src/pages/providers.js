import React from 'react';
import {Link} from '@reach/router';
import {Heading, Anchor, Paragraph, Box, Text} from 'grommet';
import {Rss, Link as LinkIcon} from 'grommet-icons';
import {useRegistrationsSelector} from 'providers/registrations/selectors';
import ProviderIcon from 'components/providers/icon';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';
import Helmet from 'components/helmet';
import {useScreenSize} from 'providers/theme/selectors';

const Provider = ({icon, link, name, ...rest}) => (
  <Box gap="small" pad="small" elevation="xsmall" {...rest}>
    <ProviderIcon alignSelf="center" src={icon} size="32px" />
    <Text alignSelf="center">{name}</Text>
    <Anchor href={link} icon={<LinkIcon color="dark-1" size="16px" />} target="_blank" label="Ιστοσελίδα" />
    <Link to={`/source/${name}/all`}>
      <Rss color="dark-1" size="16px" />
      <Text margin={{left: 'small'}} weight="bold">
        Ροή
      </Text>
    </Link>
  </Box>
);

const Providers = () => {
  const {isSmall} = useScreenSize();
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
            <Provider key={provider.name} margin={{bottom: 'large'}} width={isSmall ? '100%' : '200px'} {...provider} />
          ))}
        </Box>
      </Box>
    </Main>
  );
};

export default Providers;
