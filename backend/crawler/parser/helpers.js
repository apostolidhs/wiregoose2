const {JSDOM} = require('jsdom');

const clean = (text, min, max) => {
  if (!text || text.length < min) return null;

  const dom = new JSDOM(text);
  const textContent = dom.window.document.body.textContent
    .replace(/[«»]/g, '')
    .replace(/(\s)+/g, ' ')
    .substring(0, max)
    .trim();

  return textContent.length < min ? null : textContent;
};

module.exports = {clean};
