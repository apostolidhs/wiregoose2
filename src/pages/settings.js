import React from 'react';
import {Text, Box, Anchor} from 'grommet';
import {Rss, Info, Edit, Facebook, Twitter} from 'grommet-icons';
import styled from 'styled-components';
import {Link} from '@reach/router';
import Back from 'components/back';
import Main from 'components/main';
import TextedIcon from 'components/textedIcon';
import Helmet from 'components/helmet';

const StyledAnchor = styled(Anchor)`
  font-weight: initial;
`;

const Title = ({Icon, children, ...rest}) => (
  <Box direction="row" gap="small" align="center" {...rest}>
    <Icon size="38px" color="dark-1" />
    <Text size="large">{children}</Text>
  </Box>
);

const InternalLink = ({path, Icon, children, ...rest}) => (
  <Link to={`/settings/${path}`} {...rest}>
    <Title Icon={Icon}>{children}</Title>
  </Link>
);

const ExternalLink = ({href, path, Icon, children, ...rest}) => (
  <StyledAnchor href={href} target="_blank" {...rest}>
    <Title Icon={Icon}>{children}</Title>
  </StyledAnchor>
);

const Settings = () => {
  return (
    <Main>
      <Helmet
        title="Μενού - Wiregoose"
        description="Το βασικό μενού του Wiregoose"
        keywords={['μενού', 'Σχετικά', 'Πηγές', 'Δημιουργοί']}
      />
      <Back absolute />
      <TextedIcon margin={{top: 'large'}}>Όλα τα νέα σε ένα μέρος</TextedIcon>
      <Box pad={{horizontal: 'small', vertical: 'medium'}} gap="medium">
        <InternalLink path="about" Icon={Info}>
          Σχετικά
        </InternalLink>
        <InternalLink path="providers" Icon={Rss}>
          Πηγές
        </InternalLink>
        <InternalLink path="credits" Icon={Edit}>
          Δημιουργοί
        </InternalLink>
        <ExternalLink href="https://www.facebook.com/wiregoose" Icon={Facebook} margin={{top: 'medium'}}>
          Facebook
        </ExternalLink>
        <ExternalLink href="https://twitter.com/wiregoose" Icon={Twitter}>
          Twitter
        </ExternalLink>
        <Text margin={{top: 'medium'}} size="small" color="dark-3" textAlign="end">
          version {process.env.REACT_APP_GIT_SHA}
        </Text>
      </Box>
    </Main>
  );
};

export default Settings;
