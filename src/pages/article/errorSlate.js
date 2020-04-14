import React from 'react';
import styled from 'styled-components';
import {Box, Text, Paragraph, Button} from 'grommet';
import {DocumentMissing} from 'grommet-icons';
import {useFeedSelector} from 'providers/feeds/selectors';

const StyledText = styled(Text)`
  vertical-align: top;
`;

const errorSelector = ({link}) => ({link});

const ErrorSlate = ({id, ...rest}) => {
  const {link, provider} = useFeedSelector(id, errorSelector);

  return (
    <Box
      align="center"
      pad="medium"
      elevation="xsmall"
      gap="medium"
      border={{color: 'status-warning', size: '1px'}}
      {...rest}>
      <Paragraph size="large" margin="none">
        <DocumentMissing color="status-warning" size="32px" />{' '}
        <StyledText size="large">Δεν καταφέραμε να σας φέρουμε το άρθρο</StyledText>
      </Paragraph>
      <Button label={`Μεταφερθείτε στο ${provider}`} size="large" href={link} target="_blank" />
    </Box>
  );
};

export default ErrorSlate;
