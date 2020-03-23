import React, {useCallback} from 'react';
import {useProviderAction} from 'providers/admin/providers';
import Provider from './provider';

const Container = ({id, ...rest}) => {
  const {save, remove} = useProviderAction();

  const onDelete = useCallback(() => remove(id), [remove, id]);
  const onSave = useCallback(() => save(id), [save, id]);

  return id && <Provider id={id} onSave={onSave} onDelete={onDelete} {...rest} />;
};

export default Container;
