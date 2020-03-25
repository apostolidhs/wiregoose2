import {makeCollectionHoax} from 'react-hoax';
import getInitialState from './getInitialState';
import getResourceInitialState from './getResourceInitialState';
import * as actions from './actions';

export default makeCollectionHoax('registration', {
  actions,
  getInitialState,
  resourceOptions: {getInitialState: getResourceInitialState}
});
