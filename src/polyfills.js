const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isSafari) {
  import(/* webpackChunkName: 'polyfill.smoothscroll' */ 'smoothscroll-polyfill').then(smoothscroll =>
    smoothscroll.polyfill()
  );
}
