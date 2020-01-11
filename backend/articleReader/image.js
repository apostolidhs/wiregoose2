const url = require('url');

const protocols = new Set(['http:', 'https:']);

const hasValidUrl = src => {
  if (!src) return false;
  const {protocol, href} = url.parse(src);
  return href && protocols.has(protocol);
};

const hasValidDimensions = el => {
  const width = el.getAttribute('width');
  if (width && +width < 200) {
    return false;
  }

  const height = el.getAttribute('height');
  if (height && +height < 200) {
    return false;
  }

  return true;
};

module.exports = el => {
  let src = el.getAttribute('src');
  if (hasValidUrl(src) && hasValidDimensions(el)) {
    return src;
  }

  src = el.getAttribute('data-lazy-src');
  if (hasValidUrl(src) && hasValidDimensions(el)) {
    return src;
  }

  return null;
};
