import React, {useCallback} from 'react';
import {Match, navigate} from '@reach/router';
import {Button} from 'grommet';
import noop from 'lodash/noop';

const Link = ({to, noActive, onClick = noop, ...rest}) => {
  const click = useCallback(
    e => {
      navigate(to);
      onClick(e);
    },
    [to]
  );
  return (
    <Match path={to}>
      {({match}) => {
        const activeProps = match && {'aria-current': true, ...(!noActive && {primary: true, color: 'brand'})};
        return <Button {...activeProps} onClick={click} {...rest} />;
      }}
    </Match>
  );
};

export default Link;
