import {makeCollectionHoax} from 'react-hoax';
import getResourceInitialState from './getResourceInitialState';
import getInitialState from './getInitialState';
import * as actions from './actions';

export default makeCollectionHoax('provider', {
  actions,
  getInitialState,
  resourceOptions: {getInitialState: getResourceInitialState}
});
