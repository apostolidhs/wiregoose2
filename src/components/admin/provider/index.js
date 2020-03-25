import React, {useCallback} from 'react';
import {useProviderAction, useProviderSelector} from 'providers/admin/providers';
import Provider from './provider';

const Container = ({id, ...rest}) => {
  const isNew = id === 'new';
  const {save, remove, update, updateBatchResource} = useProviderAction();
  const pristine = useProviderSelector(id, ({pristine}) => pristine);

  const onDelete = useCallback(() => remove(id).then(() => update('editedId', null)), [id]);
  const onSave = useCallback(() => save(id).then(() => update('editedId', null)), [id]);
  const onCancel = useCallback(() => {
    if (isNew) remove(id);
    else updateBatchResource(id, pristine);

    update('editedId', null);
  }, [id, pristine]);

  return id && <Provider id={id} onSave={onSave} onDelete={onDelete} onCancel={onCancel} {...rest} />;
};

export default Container;
