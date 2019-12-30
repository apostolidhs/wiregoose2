import {useContext} from 'react';
import ApiContext from './context';

export const useApiSelector = () => useContext(ApiContext);
