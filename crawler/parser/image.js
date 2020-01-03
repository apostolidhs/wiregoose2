const url = require('url');
const normalizeUrl = require('normalize-url');
const {JSDOM} = require('jsdom');
const isValidUrl = require('../../helpers/isValidUrl');

const getAbsoluteImage = (image, domain) => {
  if (url.parse(image).hostname) return image;
  return url.resolve(domain, image);
};

const extractImage = (content, domain) => {
  const dom = new JSDOM(content);
  const imageDoms = dom.window.document.querySelectorAll('img');
  const imageUrls = Array.from(imageDoms).map(i => i.getAttribute('src'));
  const domainImageUrl = imageUrls.find(img => domain.includes(url.parse(img).hostname));
  return domainImageUrl || imageUrls[0];
};

const parseImage = ({image, content, enclosure, ...rest}, {provider: {link}}) => {
  if (image && image.$ && image.$.url) {
    return image.$.url;
  }

  if (enclosure && enclosure.url) {
    return enclosure.url;
  }

  let src = content && extractImage(content, link);
  if (src) return src;

  const contentEncoded = rest['content:encoded'];
  src = contentEncoded && extractImage(contentEncoded, link);
  if (src) return src;

  return null;
};

module.exports = (feed, registration) => {
  const path = parseImage(feed, registration);

  if (!path) return null;

  const url = getAbsoluteImage(path, registration.provider.link);
  if (!isValidUrl(url)) return null;

  return normalizeUrl(url);
};
