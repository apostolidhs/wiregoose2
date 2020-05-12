if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config({path: '.env'});
}

const {check} = require('express-validator');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const download = require('image-downloader');
const sharp = require('sharp');
const LRUCache = require('lru-cache');
const flatPromise = require('../helpers/flatPromise');
const validationMiddleware = require('../helpers/validationMiddleware');
const makeApp = require('../helpers/makeApp');
const logger = require('./logger');

const host = 'http://localhost';
const app = makeApp({
  port: process.env.IMAGE_PROXY_PORT,
  host,
  logger,
  allowOrigin: 'https://wiregoose.com http://wiregoose.com http://localhost'
});

const cacheDir = 'tmp/images';
const baseDir = path.resolve(cacheDir);
const lockPath = path.join(baseDir, '.lockProxy');
const lruCache = new LRUCache({
  max: 1024,
  dispose: key => fs.unlinkSync(key)
});

if (fs.existsSync(lockPath)) {
  const lockFile = fs.readFileSync(lockPath);
  lruCache.load(JSON.parse(lockFile));
  console.log('loaded lock file', lockPath);
}

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, {recursive: true});
  console.log('created cache folder', baseDir);
}

setInterval(() => {
  const data = lruCache.dump();
  fs.writeFileSync(lockPath, JSON.stringify(data));
}, 60 * 60 * 1000);

const hashImage = url => crypto.createHash('md5').update(url).digest('hex');

app.get('/', (req, res) => res.json({status: 'ok', name: 'image-proxy'}));

const sendOptions = {maxAge: 30 * 24 * 60 * 60 * 1000, headers: {'Content-Type': 'image/jpeg'}};

app.get(
  '*',
  [check('w').isInt({min: 0, max: 1024}).optional().toInt(), check('h').isInt({min: 0, max: 1024}).optional().toInt()],
  validationMiddleware({
    params: req => {
      const {w, h} = req.query;
      return {w, h};
    },
    onError: resp => resp.send('wrong w (width), h (height) parameter')
  }),
  async (req, res) => {
    const {w, h} = res.locals.params;
    const url = decodeURIComponent(req.url.substring(1));
    const hash = hashImage(url + JSON.stringify({w, h}));
    const filepath = path.join(baseDir, hash);

    if (lruCache.get(filepath)) {
      res.sendFile(filepath, sendOptions);
      logger.verbose(`send cache hit ${url} ${filepath}`);
      return;
    }

    const [, downloadError] = await flatPromise(
      download.image({
        url,
        dest: filepath,
        extractFilename: false,
        rejectUnauthorized: false
      })
    );

    if (downloadError) {
      logger.error(`failed download ${url} ${downloadError.toString}`);
      return res.status(404).send(downloadError + '');
    }

    const [imageBuffer, imageError] = await flatPromise(
      sharp(filepath)
        // .resize({...(w && {width: w}), ...(h && {height: h})})
        .jpeg()
        .toBuffer()
    );

    if (imageError && !imageError.toString().match(/unsupported image format/)) {
      logger.error(`failed processing ${url} ${imageError.toString()}`);
      return res.status(404).send(imageError + '');
    }

    if (imageBuffer) {
      fs.writeFileSync(filepath, imageBuffer);
    }

    lruCache.set(filepath, filepath);

    logger.verbose(`cache miss ${url} ${filepath}`);
    res.sendFile(filepath, sendOptions);
  }
);

app.listen(process.env.IMAGE_PROXY_PORT, () => {
  console.log(`✓ Proxy is running at ${host}:${process.env.IMAGE_PROXY_PORT} in ${process.env.NODE_ENV} mode`);
});
