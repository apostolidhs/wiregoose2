import React from 'react';
import {IntlProvider} from 'react-intl';
import el from './el';

const Localization = ({children}) => {
  return (
    <IntlProvider locale="el" messages={el}>
      {children}
    </IntlProvider>
  );
};

export default Localization;
