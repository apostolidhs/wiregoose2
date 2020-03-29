import React, {useState, useEffect} from 'react';
import {Box} from 'grommet';
import {useRegistrationsSelector} from 'providers/admin/registrations';

const Progress = () => {
  const lastSync = useRegistrationsSelector(({lastSync}) => lastSync);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
  }, [lastSync]);

  useEffect(() => {
    setShow(true);
  }, [show]);

  return (
    show && (
      <Box
        round="full"
        width="26px"
        height="26px"
        background="brand"
        alignSelf="center"
        animation={{type: 'fadeOut', duration: 20000}}
      />
    )
  );
};

export default Progress;
