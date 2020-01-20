const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const {check} = require('express-validator');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const download = require('image-downloader');
const sharp = require('sharp');
const LRUCache = require('lru-cache');
const flatPromise = require('../helpers/flatPromise');

const app = express();

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

const hashImage = url =>
  crypto
    .createHash('md5')
    .update(url)
    .digest('hex');

app.get('/', (req, res) => res.json({status: 'ok'}));

app.get(
  '*',
  [
    check('w')
      .isInt({min: 0, max: 1024})
      .optional()
      .toInt(),
    check('h')
      .isInt({min: 0, max: 1024})
      .optional()
      .toInt()
  ],
  validationMiddleware({
    params: req => {
      const {w, h} = req.query;
      return {w: !w && !h ? 256 : w, h};
    },
    onError: resp => resp.send('wrong w (width), h (height) parameter')
  }),
  async (req, res) => {
    const {w, h} = res.locals.params;
    const url = decodeURIComponent(req.url.substring(1));
    const hash = hashImage(url + JSON.stringify({w, h}));
    const filepath = path.join(baseDir, hash);

    if (lruCache.get(filepath)) {
      res.sendFile(filepath);
      console.log('send', filepath, 'cache hit');
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
      return res.status(404).send(downloadError + '');
    }
    console.log({...(w && {width: w}), ...(h && {height: h})});
    const [imageBuffer, imageError] = await flatPromise(
      sharp(filepath)
        .resize({...(w && {width: w}), ...(h && {height: h})})
        .jpeg()
        .toBuffer()
    );

    if (imageError) {
      return res.status(404).send(imageError + '');
    }

    fs.writeFileSync(filepath, imageBuffer);
    lruCache.set(filepath, filepath);

    res.sendFile(filepath);
    console.log('send', filepath, 'cache miss');
  }
);

app.use((err, req, res, next) => res.status(500).send(err.message));

app.listen(4011, () => {
  console.log(`✓ Proxy is running at http://localhost:${4011} in ${process.env.NODE_ENV} mode`);
});
