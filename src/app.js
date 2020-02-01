import React from 'react';
import ThemeProvider from 'providers/theme';
import ConfigProvider from 'providers/config';
import LocalizationProvider from 'providers/localization';
import ApiProvider from 'providers/api';
import FeedsProvider from 'providers/feeds';
import RegistrationsProvider from 'providers/registrations';
import Pages from './pages';

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <LocalizationProvider>
          <ApiProvider>
            <RegistrationsProvider>
              <FeedsProvider>
                <Pages />
              </FeedsProvider>
            </RegistrationsProvider>
          </ApiProvider>
        </LocalizationProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
