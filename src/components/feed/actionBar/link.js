import React, {useState, useEffect, useCallback, useRef} from 'react';
import styled, {keyframes} from 'styled-components';
import {Transition, SwitchTransition} from 'react-transition-group';
import {Button} from 'grommet';
import {Link as GLink, Checkmark} from 'grommet-icons';
import {useNotification} from 'providers/notifications';
import useIntl from 'providers/localization/useIntl';

const overlayTransitions = {
  entering: keyframes` from { opacity: 0.2; }`,
  exiting: keyframes` to { opacity: 0.2; }`
};

const StyledButton = styled(Button)`
  animation: ${props => overlayTransitions[props.transition]} 200ms;
`;

const Link = ({link}) => {
  const t = useIntl();
  const notification = useNotification();
  const [checked, setChecked] = useState(false);
  const timeoutRef = useRef();

  const copy = useCallback(
    () =>
      import('copy-to-clipboard')
        .then(copyToClipboard => copyToClipboard.default(link))
        .then(() => {
          setChecked(true);
          timeoutRef.current = setTimeout(() => setChecked(false), 500);
          notification.info('Ο σύνδεσμος αντιγράφηκε', {timeout: 3000});
        }),
    []
  );

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <SwitchTransition>
      <Transition timeout={200} key={checked}>
        {state => (
          <StyledButton
            disabled={checked}
            transition={state}
            icon={checked ? <Checkmark size="medium" color="neutral-3" /> : <GLink size="medium" />}
            title={t('social.share.link')}
            onClick={copy}
            alignSelf="start"
          />
        )}
      </Transition>
    </SwitchTransition>
  );
};

export default Link;
