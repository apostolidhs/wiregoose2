import React, {useCallback, memo, useEffect} from 'react';
import {Box} from 'grommet';
import {useRegistrationSelector, useRegistrationsSelector, useRegistrationAction} from 'providers/admin/registrations';
import Preview from './preview';
import Details from './details';

const Registration = ({id, onSave, onDelete, onExpand, provider, category, ...rest}) => {
  const update = useRegistrationAction('update');
  const expanded = useRegistrationsSelector(s => s.expandedId === id);
  const registration = useRegistrationSelector(id);
  const {processing} = registration;
  const expand = useCallback(() => update('expandedId', id), [id]);

  return (
    <Box
      width={expanded ? '100%' : 'medium'}
      onClick={expand}
      hoverIndicator={!expanded}
      animation={processing ? 'fadeIn' : null}
      pad="small"
      gap="small"
      margin="small"
      elevation="small"
      {...rest}>
      <Preview registration={registration} provider={provider} category={category} />
      {expanded && <Details registration={registration} onSave={onSave} onDelete={onDelete} />}
    </Box>
  );
};

export default memo(Registration);
