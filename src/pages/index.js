import React, {Suspense, lazy, useRef, useEffect, useCallback, useState, forwardRef} from 'react';
import {Box} from 'grommet';
import ReactGA from 'react-ga';
import {Router, navigate, Location, Redirect} from '@reach/router';
import Header from 'components/header';
import useStickyHeader from 'components/header/useStickyHeader';
import {Transition} from 'react-transition-group';
import {useScreenSize} from 'providers/theme/selectors';
import {useIsAdmin} from 'providers/session';
import {enabledAdSense} from 'helpers/environment';

const NavBar = lazy(() => import(/* webpackChunkName: 'components.navbar' */ 'components/navbar'));
const SlideSidebar = lazy(() => import(/* webpackChunkName: 'components.sidebar.slide' */ './sidebar/slide'));
const Sidebar = lazy(() => import(/* webpackChunkName: 'components.sidebar' */ './sidebar'));

const Admin = lazy(() => import(/* webpackChunkName: 'page.admin' */ './admin'));
const Login = lazy(() => import(/* webpackChunkName: 'page.login' */ './login'));
const Categories = lazy(() => import(/* webpackChunkName: 'page.categories' */ './categories'));
const Sources = lazy(() => import(/* webpackChunkName: 'page.sources' */ './sources'));
const Article = lazy(() => import(/* webpackChunkName: 'page.article' */ './article'));
const Settings = lazy(() => import(/* webpackChunkName: 'page.settings' */ './settings'));
const Providers = lazy(() => import(/* webpackChunkName: 'page.providers' */ './providers'));
const About = lazy(() => import(/* webpackChunkName: 'page.about' */ './about'));
const Credits = lazy(() => import(/* webpackChunkName: 'page.credits' */ './credits'));

const Layout = ({children}) => (
  <Box fill direction="column">
    {children}
  </Box>
);

const RouterComponent = forwardRef(({tabIndex, children, ...rest}, ref) => (
  <Box ref={ref} height={{min: 'initial'}} width="calc(100% - 300px)" direction="column" flex="grow" {...rest}>
    {children}
  </Box>
));

const initialContentPadding = {
  horizontal: 'none',
  top: 'none',
  bottom: 'none'
};

const isSidebarOpen = () => window.location.hash === '#sidebar';

const trackPage = () => {
  if (!enabledAdSense()) return;
  ReactGA.pageview(window.location.href);
};

const NotFound = () => {
  navigate('/');
  return null;
};

const Pages = () => {
  let prevLocation = window.location.href;
  const {isSmall, isLarge} = useScreenSize();
  const isAdmin = useIsAdmin();

  const headerRef = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(isSidebarOpen);
  const [contentPadding, setContentPadding] = useState(initialContentPadding);

  const onNavBarReady = useCallback(({height}) => {
    setContentPadding(s => ({...s, bottom: `${height}px`}));
  }, []);

  useEffect(() => {
    setSidebarOpen(isSmall && isSidebarOpen());
  }, [isSmall]);

  useEffect(() => {
    if (!headerRef.current) return;
    setContentPadding(s => ({...s, top: `${headerRef.current.clientHeight}px`}));
  }, [headerRef.current]);

  useEffect(() => {
    if (!enabledAdSense()) return;
    ReactGA.initialize('UA-90338056-2');
    trackPage();
  }, []);

  useStickyHeader(headerRef);

  const onMenuClick = useCallback(() => {
    window.location.hash = 'sidebar';
    setSidebarOpen(true);
  }, []);

  const onOverlayClick = useCallback(() => {
    window.location.hash = '';
    setSidebarOpen(false);
  }, []);

  return (
    <Location>
      {({location}) => {
        if (isSmall && prevLocation !== location.href && sidebarOpen !== isSidebarOpen()) {
          setSidebarOpen(!sidebarOpen);
        }

        if (prevLocation !== location.href) {
          trackPage();
        }

        return (
          <Layout>
            <Header ref={headerRef} />
            {isSmall && (
              <Suspense fallback={null}>
                <Transition in={sidebarOpen} timeout={200} mountOnEnter unmountOnExit>
                  {state => <SlideSidebar transition={state} onOverlayClick={onOverlayClick} />}
                </Transition>
              </Suspense>
            )}
            <Box
              alignSelf={isSmall ? 'stretch' : 'center'}
              overflow="initial"
              direction="row"
              pad={contentPadding}
              width={isLarge ? 'xlarge' : '100%'}
              height={{min: 'initial'}}>
              {!isSmall && (
                <Suspense fallback={null}>
                  <Box
                    direction="column"
                    height={{min: 'large'}}
                    width={{min: '264px', max: '264px'}}
                    pad="medium"
                    margin={{right: 'medium'}}>
                    <Sidebar />
                  </Box>
                </Suspense>
              )}
              <Suspense fallback={null}>
                <Router component={RouterComponent}>
                  <Categories path="/" category="all" />
                  <Categories path="category/:category" />
                  <Sources path="source/:source/:category" />

                  <Article path="feed/:feedId/article" />

                  <Settings path="settings" />
                  <Providers path="settings/providers" />
                  <About path="settings/about" />
                  <Credits path="settings/credits" />

                  {isAdmin && <Admin path="admin/*" />}
                  {!isAdmin && <Redirect from="/admin/*" to="/login" noThrow />}

                  <Login path="login" />

                  <NotFound default />
                </Router>
              </Suspense>
            </Box>
            {isSmall && (
              <Suspense fallback={null}>
                <NavBar onReady={onNavBarReady} onMenuClick={onMenuClick} />
              </Suspense>
            )}
          </Layout>
        );
      }}
    </Location>
  );
};

export default Pages;
