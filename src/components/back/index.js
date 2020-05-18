import React from 'react';
import styled from 'styled-components';
import {Button} from 'grommet';
import {FormPrevious} from 'grommet-icons';

const StyledButton = styled(Button)`
  ${({absolute}) =>
    absolute &&
    `
    position: absolute;
    left: 11px;
    top: 14px;
  `}
`;

const goBack = () => window.history.back();

const Back = ({onClick = goBack, noLabel, ...rest}) => (
  <StyledButton icon={<FormPrevious size="32px" />} gap="none" onClick={onClick} plain {...rest} />
);

export default Back;
