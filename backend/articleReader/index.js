const {JSDOM} = require('jsdom');
const Readability = require('readability');

const extractContent = dom => {
  headings = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);
  return Array.from(dom.querySelectorAll('p,img,h1,h2,h3,h4,h5,h6')).reduce((h, el) => {
    if (el.tagName === 'IMG') {
      return [...h, {type: 'img', src: el.src}];
    }

    const content = el.textContent
      .replace(/[«»]/g, '')
      .replace(/(\s)+/g, ' ')
      .trim();

    if (!content) return h;

    if (headings.has(el.tagName)) {
      return [...h, {type: 'h', content}];
    }

    return [...h, {type: 'p', content}];
  }, []);
};

const fromFile = async filepath => {
  const dom = await JSDOM.fromFile(filepath);
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  console.log(article.content);
  const fragment = JSDOM.fragment(article.content);
  return extractContent(fragment);
};

module.exports = {fromFile};
