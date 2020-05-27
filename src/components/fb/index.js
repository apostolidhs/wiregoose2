import React, {useEffect, useRef} from 'react';
import {Box, Anchor, Heading} from 'grommet';
import {Facebook} from 'grommet-icons';
import styled from 'styled-components';
import {useFacebook} from 'providers/facebook';

const FBContianer = styled(Box)`
  .fb-page,
  .fb-page span,
  .fb-page span iframe[style] {
    width: 100% !important;
  }
`;

const FB = props => {
  const ref = useRef();
  const {getFB} = useFacebook();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    getFB().then(fb => fb.XFBML.parse(ref.current));
  }, []);

  return (
    <FBContianer ref={ref} {...props}>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/wiregoose/"
        data-width="450"
        data-height="450"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true">
        <blockquote style={{margin: 0}} cite="https://www.facebook.com/wiregoose/" className="fb-xfbml-parse-ignore">
          <Anchor href="https://www.facebook.com/wiregoose" target="_blank">
            <Heading margin={{bottom: 'xsmall'}} level="3" size="small">
              Γίνε μέλος της μεγάλης παρέας στο Facebook
            </Heading>
          </Anchor>
          <Anchor
            href="https://www.facebook.com/wiregoose"
            icon={<Facebook color="neutral-3" size="16px" />}
            target="_blank"
            label="Wiregoose"
            color="neutral-3"
          />
        </blockquote>
      </div>
    </FBContianer>
  );
};

export default FB;
