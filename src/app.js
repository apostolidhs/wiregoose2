import React from 'react';
import ThemeProvider from 'providers/theme';
import ConfigProvider from 'providers/config';
import SessionProvider from 'providers/session';
import LocalizationProvider from 'providers/localization';
import ApiProvider from 'providers/api';
import FeedsProvider from 'providers/feeds';
import RegistrationsProvider from 'providers/registrations';
import Pages from './pages';

const App = () => (
  <ThemeProvider>
    <ConfigProvider>
      <SessionProvider>
        <LocalizationProvider>
          <ApiProvider>
            <RegistrationsProvider>
              <FeedsProvider>
                <Pages />
              </FeedsProvider>
            </RegistrationsProvider>
          </ApiProvider>
        </LocalizationProvider>
      </SessionProvider>
    </ConfigProvider>
  </ThemeProvider>
);

export default App;
