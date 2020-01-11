const {JSDOM} = require('jsdom');
const Readability = require('readability');
const extractImage = require('./image');
const extractText = require('./text');

const headings = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

const extractContent = dom => {
  return Array.from(dom.querySelectorAll('p,img,h1,h2,h3,h4,h5,h6')).reduce((h, el) => {
    if (el.tagName === 'IMG') {
      const src = extractImage(el);
      return src ? [...h, {type: 'img', src}] : h;
    }

    const text = extractText(el);

    if (!text) return h;

    if (headings.has(el.tagName)) {
      return [...h, {type: 'h', content: text}];
    }

    return [...h, {type: 'p', content: text}];
  }, []);
};

const fromFile = async filepath => {
  const dom = await JSDOM.fromFile(filepath);
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  // console.log(article.content);
  const fragment = JSDOM.fragment(article.content);
  return extractContent(fragment);
};

fromFile('/Users/yannis/Documents/wiregoose2/fixtures/articles/in2.html').then(c =>
  console.log(JSON.stringify(c, 0, 2))
);

module.exports = {fromFile};
