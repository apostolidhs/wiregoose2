import React, {useCallback, memo} from 'react';
import {Box} from 'grommet';
import Preview from './preview';
import Details from './details';

const Registration = ({onSave, onDelete, expanded, onExpand, registration, ...rest}) => {
  const {id, processing} = registration;
  const expand = useCallback(() => onExpand(id), [id]);

  return (
    <Box
      width={expanded ? '100%' : 'medium'}
      onClick={expand}
      hoverIndicator={!expanded}
      animation={processing ? 'fadeIn' : null}
      pad="medium"
      gap="small"
      margin="small"
      elevation="small"
      {...rest}>
      <Preview registration={registration} />
      {expanded && <Details registration={registration} onSave={onSave} onDelete={onDelete} />}
    </Box>
  );
};

export default memo(Registration);
