const {JSDOM} = require('jsdom');
const Readability = require('readability');
const flat = require('../../helpers/flatPromise');
const errorTypes = require('../models/articleErrorTypes');
const extractImage = require('./image');
const extractVideo = require('./video');
const extractText = require('./text');
const url2 = require('url');

const headings = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

const uniqueAdd = (set, list, content, item) => {
  if (content && !set.has(content)) {
    set.add(content);
    list.push(item);
  }
  return list;
};

const extractContent = (dom, {href}) => {
  const unique = new Set();
  return Array.from(dom.querySelectorAll('p,img,h1,h2,h3,h4,h5,h6,[src*="https://www.youtube"]')).reduce((h, el) => {
    if (el.tagName === 'IMG') {
      const src = extractImage(el, {href});
      return uniqueAdd(unique, h, src, {type: 'img', src});
    }

    const src = extractVideo(el);
    if (src) return uniqueAdd(unique, h, src, {type: 'video', src});

    const text = extractText(el);

    if (!text) return h;

    if (headings.has(el.tagName)) {
      return uniqueAdd(unique, h, text, {type: 'h', text});
    }

    return uniqueAdd(unique, h, text, {type: 'p', text});
  }, []);
};

const parse = (dom, {href}) => {
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  const fragment = JSDOM.fragment(article.content);
  return extractContent(fragment, {href});
};

const fromFile = async (filepath, {href}) => {
  const options = {url: href, contentType: 'text/html; charset=utf-8'};
  const [dom, fetchError] = await flat(JSDOM.fromFile(filepath, options));
  if (fetchError) return [, errorTypes.fetch];

  const content = parse(dom, {href});
  if (!content.length) return [, errorTypes.parse];

  return [content];
};

const getNormalizedUrl = url => {
  const {host, ...parsed} = url2.parse(url);
  return host.startsWith('www') ? url : url2.format({...parsed, host: `www.${host}`});
};

const fromURL = async url => {
  const normalizedUrl = getNormalizedUrl(url);
  const [dom, fetchError] = await flat(JSDOM.fromURL(normalizedUrl));
  if (fetchError) return [[], errorTypes.fetch];

  const content = parse(dom, {href: normalizedUrl});
  if (!content.length) return [[], errorTypes.parse];

  return [content];
};

module.exports = {fromURL, fromFile};
