if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path: '.env'});
}

const puppeteer = require('puppeteer');
const LRUCache = require('lru-cache');
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

// sanitize check
puppeteer
  .launch({headless: true, args: ['--no-sandbox']})
  .then(browser => browser.newPage().then(() => browser.close()));

const webpage = process.env.NODE_ENV === 'production' ? 'https://wiregoose.com/' : 'http://localhost:3000/';

app.get('*', async (req, res) => {
  const url = decodeURIComponent(req.url.substring(1));

  if (lruCache.has(url)) return res.send(lruCache.get(url));

  let browser;
  try {
    browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});

    const page = await browser.newPage();

    await page.goto(url, {waitUntil: 'networkidle0'});

    let html = await page.content();

    html = html.replace(/href=\"\//g, `href="${webpage}`).replace(/src=\"\//g, `src="${webpage}`);

    browser.close();

    lruCache.set(url, html);
    logger.verbose(`url ${url}, content size ${html.length}`);
    return res.send(html);
  } catch (error) {
    logger.error(error.toString());

    if (browser) {
      browser.close();
    }

    return res.status(400).send(error);
  }
});

app.listen(process.env.SSR_PORT, () => {
  console.log(`✓ SSR is running at ${host}:${process.env.SSR_PORT} in ${process.env.NODE_ENV} mode`);
});
