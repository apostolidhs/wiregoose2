import React, {Suspense, lazy, useRef, useEffect, useState, forwardRef} from 'react';
import {Box} from 'grommet';
import {Router, navigate, Location} from '@reach/router';
import Header from 'components/header';
import useStickyHeader from 'components/header/useStickyHeader';
import {Transition} from 'react-transition-group';
import {useScreenSize} from 'providers/theme/selectors';
import {useIsAdminSelector} from 'providers/session';

const NavBar = lazy(() => import(/* webpackChunkName: 'components.navbar' */ 'components/navbar'));
const SlideSidebar = lazy(() => import(/* webpackChunkName: 'components.sidebar.slide' */ './sidebar/slide'));
const Sidebar = lazy(() => import(/* webpackChunkName: 'components.sidebar' */ './sidebar'));

const Admin = lazy(() => import(/* webpackChunkName: 'page.admin' */ './admin'));
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

const getPadding = ref => `${ref.current ? ref.current.clientHeight : 0}px`;

const initialContentPadding = {
  horizontal: 'none',
  top: 'none',
  bottom: 'none'
};

const isSidebarOpen = () => window.location.hash === '#sidebar';

const NotFound = () => {
  navigate('/');
  return null;
};

const Pages = () => {
  let prevLocation = window.location.href;
  const {isSmall, isLarge} = useScreenSize();
  const isAdmin = useIsAdminSelector();

  const headerRef = useRef();
  const navBarRef = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(isSidebarOpen);
  const [contentPadding, setContentPadding] = useState(initialContentPadding);

  useEffect(() => {
    setTimeout(() => {
      setSidebarOpen(isSmall && isSidebarOpen());
      setContentPadding({...initialContentPadding, top: getPadding(headerRef), bottom: getPadding(navBarRef)});
    }, 0);
  }, [isSmall]);

  useStickyHeader(headerRef);

  return (
    <Location>
      {({location}) => {
        if (isSmall && prevLocation !== location.href) {
          setSidebarOpen(isSidebarOpen());
        }

        return (
          <Suspense fallback={null}>
            <Layout>
              <Header ref={headerRef} />
              {isSmall && (
                <Transition in={sidebarOpen} timeout={300} mountOnEnter unmountOnExit>
                  {state => <SlideSidebar transition={state} />}
                </Transition>
              )}
              <Box
                alignSelf={isSmall ? 'stretch' : 'center'}
                overflow="initial"
                direction="row"
                pad={contentPadding}
                width={isLarge ? 'xlarge' : '100%'}
                height={{min: 'initial'}}>
                {!isSmall && (
                  <Box
                    direction="column"
                    height={{min: 'initial'}}
                    width={{min: '264px', max: '264px'}}
                    pad="medium"
                    margin={{right: 'medium'}}>
                    <Sidebar />
                  </Box>
                )}
                <Suspense fallback={null}>
                  <Router component={RouterComponent}>
                    <Categories path="/" />
                    <Categories path="category/:category" />
                    <Sources path="source/:source/:category" />

                    <Article path="feed/:feedId/article" />

                    <Settings path="settings" />
                    <Providers path="settings/providers" />
                    <About path="settings/about" />
                    <Credits path="settings/credits" />

                    {isAdmin && <Admin path="admin/*" />}

                    <NotFound default />
                  </Router>
                </Suspense>
              </Box>
              {isSmall && <NavBar ref={navBarRef} />}
            </Layout>
          </Suspense>
        );
      }}
    </Location>
  );
};

export default Pages;
