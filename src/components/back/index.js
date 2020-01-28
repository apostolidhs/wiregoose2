import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Button} from 'grommet';
import {FormPrevious} from 'grommet-icons';

const StyledButton = styled(Button)`
  ${({absolute}) =>
    absolute &&
    `
    position: absolute;
    left: 4px;
    top: 7px;
  `}
`;

const goBack = () => window.history.back();

const Back = ({onClick = goBack, noLabel, ...rest}) => (
  <StyledButton
    icon={<FormPrevious size="32px" />}
    gap="none"
    label={!noLabel && 'Πίσω'}
    onClick={onClick}
    plain
    {...rest}
  />
);

export default Back;