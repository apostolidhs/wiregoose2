import React from 'react';
import ThemeProvider from 'providers/theme';
import NotificationsProvider from 'providers/notifications';
import ConfigProvider from 'providers/config';
import SessionProvider from 'providers/session';
import LocalizationProvider from 'providers/localization';
import ApiProvider from 'providers/api';
import FeedsProvider from 'providers/feeds';
import RegistrationsProvider from 'providers/registrations';
import Pages from './pages';

const App = () => (
  <ThemeProvider>
    <NotificationsProvider>
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
    </NotificationsProvider>
  </ThemeProvider>
);

export default App;
