import React, {useCallback, memo} from 'react';
import {Box} from 'grommet';
import {useRegistrationSelector, useRegistrationsSelector, useRegistrationAction} from 'providers/admin/registrations';
import Preview from './preview';
import Details from './details';

const Registration = ({id, onSave, onDelete, onExpand, ...rest}) => {
  const update = useRegistrationAction('update');
  const expanded = useRegistrationsSelector(s => s.expanded === id);
  const registration = useRegistrationSelector(id);
  const {processing} = registration;
  const expand = useCallback(() => update('expanded', id), [id]);

  console.log('rerender', id);
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
