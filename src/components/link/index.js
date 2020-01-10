import React, {useCallback} from 'react';
import {Match, navigate} from '@reach/router';
import {Button} from 'grommet';

const Link = ({to, noActive, ...rest}) => {
  const onClick = useCallback(() => {
    navigate(to);
  }, [to]);
  return (
    <Match path={to}>
      {({match}) => {
        const activeProps = match && {'aria-current': true, ...(!noActive && {primary: true, color: 'brand'})};
        return <Button {...activeProps} onClick={onClick} {...rest} />;
      }}
    </Match>
  );
};

export default Link;