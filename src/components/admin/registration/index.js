import React, {useCallback, memo} from 'react';
import styled from 'styled-components';
import {Box} from 'grommet';
import Preview from './preview';
import Details from './details';

const Container = styled(Box)`
  ${({processing}) => processing && 'opacity: 0.2;'}
`;

const Registration = ({expanded, onExpand, registration, ...rest}) => {
  const {id, processing} = registration;
  const expand = useCallback(() => onExpand(id), [id]);

  return (
    <Container
      width={expanded ? '100%' : 'medium'}
      onClick={expand}
      hoverIndicator={!expanded}
      processing={processing}
      pad="medium"
      gap="small"
      margin="small"
      elevation="small"
      {...rest}>
      <Preview registration={registration} />
      {(true || expanded) && <Details registration={registration} />}
    </Container>
  );
};

export default memo(Registration);
