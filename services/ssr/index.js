if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path: '.env'});
}

const puppeteer = require('puppeteer');
const LRUCache = require('lru-cache');
const flat = require('../helpers/flatPromise');
const makeApp = require('../helpers/makeApp');
const logger = require('./logger');

const host = 'http://localhost';
const app = makeApp({
  port: process.env.SSR_PORT,
  host,
  logger,
  allowOrigin: 'https://wiregoose.com http://wiregoose.com http://localhost'
});
const lruCache = new LRUCache({max: 256});

let browser;
let page;
puppeteer
  .launch({headless: true, args: ['--no-sandbox']})
  .then(br => {
    browser = br;
    return browser.newPage();
  })
  .then(pg => {
    page = pg;
  });

const webpage = process.env.NODE_ENV === 'production' ? 'https://www.wiregoose.com/' : 'http://localhost:3000/';

const ssr = async url => {
  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content();
  return html.replace(/href=\"\//g, `href="${webpage}`).replace(/src=\"\//g, `src="${webpage}`);
};

app.get('*', async (req, res) => {
  const url = decodeURIComponent(req.url.substring(1));

  if (lruCache.has(url)) return res.send(lruCache.get(url));

  const [html, error] = await flat(ssr(url));

  if (error) return res.status(400).send(error);

  lruCache.set(url, html);
  return res.send(html);
});

process.on('SIGTERM', async () => {
  await browser.close();
});

app.listen(process.env.SSR_PORT, () => {
  console.log(`✓ SSR is running at ${host}:${process.env.SSR_PORT} in ${process.env.NODE_ENV} mode`);
});
