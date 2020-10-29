import React, {useEffect, useRef} from 'react';
import {Box, Anchor, Heading} from 'grommet';
import {Facebook} from 'grommet-icons';
import styled from 'styled-components';
import {useFacebookSelector} from 'providers/facebook';
import {enabledFBAdv} from 'helpers/environment';

const FBContianer = styled(Box)`
  .fb-page,
  .fb-page span,
  .fb-page span iframe[style] {
    width: 100% !important;
  }
`;

const StyledFacebook = styled(Facebook)`
  align-self: baseline;
  margin-top: 6px;
`;

const StyledAnchor = styled(Anchor)`
  font-weight: initial;
`;

const FB = props => {
  const ref = useRef();
  const {fb} = useFacebookSelector();

  useEffect(() => void enabledFBAdv() && fb && fb.XFBML.parse(ref.current), [fb]);

  return (
    <FBContianer gap="medium" ref={ref} {...props}>
      <Anchor
        icon={<StyledFacebook />}
        label={
          <Heading margin="none" level="3" size="small">
            Παρακολουθήστε μας και απο το Facebook
          </Heading>
        }
        href="https://www.facebook.com/wiregoose"
        target="_blank"></Anchor>
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
          <Box as="p" height={{min: 'initial'}} color="dark-2">
            <StyledAnchor href="https://www.facebook.com/wiregoose" target="_blank">
              Γίνε μέλος της μεγάλης παρέας στο Facebook
            </StyledAnchor>
          </Box>
        </blockquote>
      </div>
    </FBContianer>
  );
};

export default FB;
