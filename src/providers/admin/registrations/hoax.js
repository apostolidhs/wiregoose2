import {makeCollectionHoax} from 'react-hoax';
import getResourceInitialState from './getInitialState';
import * as actions from './actions';

export default makeCollectionHoax('registration', {
  actions,
  resourceOptions: {getInitialState: getResourceInitialState}
});
