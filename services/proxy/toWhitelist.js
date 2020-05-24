const wwwUrl = require('../helpers/wwwUrl');

module.exports = url => {
  if (url.startsWith('https://ert.gr')) return wwwUrl(url);
  return url;
};
