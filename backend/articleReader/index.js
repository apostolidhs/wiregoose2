const {JSDOM} = require('jsdom');
const Readability = require('readability');
const extractImage = require('./image');
const extractVideo = require('./video');
const extractText = require('./text');

const headings = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

const extractContent = (dom, {href}) => {
  return Array.from(dom.querySelectorAll('p,img,h1,h2,h3,h4,h5,h6,[src*="https://www.youtube"]')).reduce((h, el) => {
    if (el.tagName === 'IMG') {
      const src = extractImage(el, {href});
      return src ? [...h, {type: 'img', src}] : h;
    }

    const src = extractVideo(el);
    if (src) return [...h, {type: 'video', content: src}];

    const text = extractText(el);

    if (!text) return h;

    if (headings.has(el.tagName)) {
      return [...h, {type: 'h', content: text}];
    }

    return [...h, {type: 'p', content: text}];
  }, []);
};

const fromFile = async (filepath, {href}) => {
  const dom = await JSDOM.fromFile(filepath, {url: href, contentType: 'text/html; charset=utf-8'});
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  console.log(article.content);
  const fragment = JSDOM.fragment(article.content);
  return extractContent(fragment, {href});
};

fromFile('/Users/yannis/Documents/wiregoose2/fixtures/articles/lifo2.htm', {
  href: 'https://example.com/myarticle'
}).then(c => console.log(JSON.stringify(c, 0, 2)));

module.exports = {fromFile};
