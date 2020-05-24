const https = require('https');
const http = require('http');
const nativeUrl = require('url');
const fs = require('fs');
const requestHeaders = require('../helpers/requestHeaders');

const download = (url, {dest, redirects = 3, currentRedirects = 0, ...options}) => {
  const {protocol} = nativeUrl.parse(url);
  const request = protocol === 'https:' ? https : http;

  return new Promise((resolve, reject) =>
    request
      .get(url, {...requestHeaders, timeout: 6000, ...options}, res => {
        if (res.statusCode === 301 && res.headers.location) {
          res.resume();

          if (currentRedirects === redirects) return reject('max redirects');

          return download(res.headers.location, {
            dest,
            redirects,
            currentRedirects: currentRedirects + 1,
            ...options
          })
            .then(resolve)
            .catch(reject);
        }

        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`${res.statusCode}`));
        }

        res.pipe(fs.createWriteStream(dest)).once('close', () => resolve({filename: dest}));
      })
      .on('timeout', reject)
      .on('error', reject)
  );
};

module.exports = download;
