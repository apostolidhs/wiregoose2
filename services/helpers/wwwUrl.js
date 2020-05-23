const url = require('url');

module.exports = link => {
  const {host, ...parsed} = url.parse(link);
  return host.startsWith('www') ? link : url.format({...parsed, host: `www.${host}`});
};
