import React from 'react';
import {Grommet} from 'grommet';
import ConfigProvider from 'providers/config';
import ApiProvider from 'providers/api';
import FeedsProvider from 'providers/feeds';
import RegistrationsProvider from 'providers/registrations';
import Pages from './pages';
import GlobalStyle from 'components/globalStyle';

const theme = {
  global: {
    font: {
      family: "'Noto Sans', sans-serif"
      // size: '18px',
      // height: '20px'
    }
  }
};

function App() {
  return (
    <Grommet theme={theme} style={{height: '100%'}}>
      <GlobalStyle />
      <ConfigProvider>
        <ApiProvider>
          <RegistrationsProvider>
            <FeedsProvider>
              <Pages />
            </FeedsProvider>
          </RegistrationsProvider>
        </ApiProvider>
      </ConfigProvider>
    </Grommet>
  );
}

export default App;
