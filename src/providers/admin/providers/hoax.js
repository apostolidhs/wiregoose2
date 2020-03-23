import {makeCollectionHoax} from 'react-hoax';
import getResourceInitialState from './getInitialState';
import * as actions from './actions';

export default makeCollectionHoax('provider', {actions, resourceOptions: {getInitialState: getResourceInitialState}});
