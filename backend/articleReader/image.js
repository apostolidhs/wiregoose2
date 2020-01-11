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

const extractImage = (src, {href: baseHref}) => {
  if (!src) return null;
  const {protocol, href, path} = url.parse(src);
  if (!href) return null;
  if (protocols.has(protocol)) return src;
  if (protocol === 'file:') return `${baseHref}${path}`;
  return null;
};

module.exports = (el, {href}) => {
  if (!hasValidDimensions(el)) return null;

  let src = extractImage(el.getAttribute('src'), {href});
  if (src) return src;

  src = extractImage(el.getAttribute('data-lazy-src'), {href});
  if (src) return src;

  return null;
};
