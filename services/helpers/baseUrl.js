const url = require('url');

module.exports = href => {
  const {protocol, host} = url.parse(href);
  return `${protocol}//${host}`;
};
