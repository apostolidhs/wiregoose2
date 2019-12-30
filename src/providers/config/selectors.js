import {useContext} from 'react';
import Context from './context';

export const useConfigSelector = () => useContext(Context);
