import React, {useRef, useEffect, useState} from 'react';
import {Box} from 'grommet';
import {Router, navigate, Location} from '@reach/router';
import Header from 'components/header';
import useStickyHeader from 'components/header/useStickyHeader';
import NavBar from 'components/navbar';
import {Transition} from 'react-transition-group';
import {useScreenSize} from 'providers/theme/selectors';
import SlideSidebar from './sidebar/slide';
import Sidebar from './sidebar';
import Categories from './categories';
import Sources from './sources';
import Article from './article';
import Settings from './settings';
import Providers from './providers';
import About from './about';
import Credits from './credits';

const Layout = ({children}) => (
  <Box fill direction="column">
    {children}
  </Box>
);

const Routes = ({children, style, className}) => (
  <Router style={style} className={className}>
    {children}
  </Router>
);

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
  const {isSmall} = useScreenSize();

  const headerRef = useRef();
  const navBarRef = useRef();
  const [sidebarOpen, setSidebarOpen] = useState(isSidebarOpen);
  const [contentPadding, setContentPadding] = useState(initialContentPadding);

  useEffect(() => {
    setSidebarOpen(isSmall && isSidebarOpen());
    setContentPadding({...initialContentPadding, top: getPadding(headerRef), bottom: getPadding(navBarRef)});
  }, [isSmall]);

  useStickyHeader(headerRef);

  return (
    <Location>
      {({location}) => {
        if (isSmall && prevLocation !== location.href) {
          setSidebarOpen(isSidebarOpen());
        }

        return (
          <Layout>
            <Header ref={headerRef} />
            <Transition in={sidebarOpen} timeout={300} mountOnEnter unmountOnExit>
              {state => <SlideSidebar transition={state} />}
            </Transition>
            <Box
              alignSelf={isSmall ? 'stretch' : 'center'}
              overflow="initial"
              direction="row"
              pad={contentPadding}
              height={{min: 'initial'}}
              width={'xlarge'}>
              {!isSmall && (
                <Box direction="column" height={{min: 'initial'}} width="264px" pad="medium" margin={{right: 'medium'}}>
                  <Sidebar />
                </Box>
              )}
              <Box direction="column" flex="grow" as={Routes} width={{max: 'large'}}>
                <Categories path="/" />
                <Categories path="category/:category" />
                <Sources path="source/:source/:category" />

                <Article path="feed/:feedId/article" />

                <Settings path="settings" />
                <Providers path="settings/providers" />
                <About path="settings/about" />
                <Credits path="settings/credits" />
                <NotFound default />
              </Box>
            </Box>
            {isSmall && <NavBar ref={navBarRef} />}
          </Layout>
        );
      }}
    </Location>
  );
};

export default Pages;
