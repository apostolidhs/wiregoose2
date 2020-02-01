import {useIntl} from 'react-intl';

export default () => {
  const {formatMessage} = useIntl();
  return id => formatMessage({id});
};
