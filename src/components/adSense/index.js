import React, {useEffect} from 'react';
import {Box} from 'grommet';
import {useAdSenseDispatch} from 'providers/adsense';
import {enabledAdSense} from 'helpers/environment';
import Placeholder from './placeholder';

const AdSense = props => {
  const {update} = useAdSenseDispatch();

  useEffect(() => {
    if (!enabledAdSense()) return;
    update();
  }, []);

  return (
    <Box {...props}>
      <Placeholder />
      <ins
        className="adsbygoogle"
        style={{display: 'block'}}
        data-ad-format="fluid"
        data-ad-layout-key="-4t+dk-v-5u+on"
        data-ad-client="ca-pub-3571483150053473"
        data-ad-slot="8493166831"></ins>
    </Box>
  );
};

export default AdSense;
