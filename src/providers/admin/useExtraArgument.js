import {useRef} from 'react';
import {useApiSelector} from 'providers/api/selectors';
import {useNotification} from 'providers/notifications';
import {useSessionAction} from 'providers/session';

export default () => {
  const ref = useRef();
  const api = useApiSelector();
  ref.current = api;
  const notification = useNotification();
  const update = useSessionAction('update');

  const errorHandler = (error) => {
    if (error.status === 401) {
      notification.warning(`Invalid Credentials`);
      update('token', '');
    }
    throw error;
  };

  return {getApi: () => ref.current, notification, errorHandler};
};
