import {useEffect} from 'react';
import throttle from 'lodash/throttle';

export default headerRef => {
  useEffect(() => {
    if (!headerRef.current) return;

    const height = headerRef.current.clientHeight;
    let prevScrollpos = window.pageYOffset;

    const onScroll = throttle(() => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < height || prevScrollpos - currentScrollPos > 5) {
        if (headerRef.current.style.transform !== 'translateY(0)') {
          headerRef.current.style.transform = 'translateY(0)';
        }
      }

      if (prevScrollpos - currentScrollPos < -5) {
        if (headerRef.current.style.transform !== 'translateY(-100%)') {
          headerRef.current.style.transform = 'translateY(-100%)';
        }
      }

      prevScrollpos = currentScrollPos;
    }, 200);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [headerRef.current]);
};
