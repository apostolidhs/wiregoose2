const wwwUrl = require('../helpers/wwwUrl');

const whitelist = ['https://skai.gr', 'https://ert.gr'];

module.exports = url => {
  if (whitelist.some(base => url.startsWith(base))) return wwwUrl(url);
  return url;
};
