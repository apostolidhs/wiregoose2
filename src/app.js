import React, {useEffect} from 'react';
import ThemeProvider from 'providers/theme';
import NotificationsProvider from 'providers/notifications';
import ConfigProvider from 'providers/config';
import SessionProvider from 'providers/session';
import LocalizationProvider from 'providers/localization';
import FacebookProvider from 'providers/facebook';
import ApiProvider from 'providers/api';
import FeedsProvider from 'providers/feeds';
import RegistrationsProvider from 'providers/registrations';
import Pages from './pages';

const App = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      import('react-ga').then(ReactGA => ReactGA.initialize('UA-90338056-2'));
    }
  }, []);

  return (
    <ThemeProvider>
      <NotificationsProvider>
        <ConfigProvider>
          <SessionProvider>
            <LocalizationProvider>
              <FacebookProvider>
                <ApiProvider>
                  <RegistrationsProvider>
                    <FeedsProvider>
                      <Pages />
                    </FeedsProvider>
                  </RegistrationsProvider>
                </ApiProvider>
              </FacebookProvider>
            </LocalizationProvider>
          </SessionProvider>
        </ConfigProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
};

export default App;
