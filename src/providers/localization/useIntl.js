import {useIntl} from 'react-intl';

export default () => {
  const {formatMessage} = useIntl();
  return (id, values) => formatMessage({id}, values);
};
