import {makeCollectionHoax} from 'react-hoax';
import getResourceInitialState from './getInitialState';

export default makeCollectionHoax('registration', {resourceOptions: {getInitialState: getResourceInitialState}});
