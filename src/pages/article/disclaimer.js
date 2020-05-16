import React from 'react';
import styled from 'styled-components';
import {Anchor, Text} from 'grommet';
import {useFeedSelector} from 'providers/feeds/selectors';

const Link = styled(Anchor)`
  &&& {
    color: ${({theme}) => theme.global.colors['neutral-3']};
  }
`;

const disclaimerSelector = ({provider, link}) => ({provider, link});

const Disclaimer = ({id, ...rest}) => {
  const {provider, link} = useFeedSelector(id, disclaimerSelector);
  return (
    <Text color="dark-3" size="small" {...rest}>
      Προσπαθήσαμε να εξάγουμε το άρθρο από το {provider}. Μπορείτε να{' '}
      <Link label={`μεταφερθείτε στο γνήσιο άρθρο`} href={link} target="_blank" />
    </Text>
  );
};

export default Disclaimer;
