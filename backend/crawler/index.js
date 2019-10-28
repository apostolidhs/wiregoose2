const fs = require('fs');
const url = require('url');
const Parser = require('rss-parser');
const dateFns = require('date-fns');

const parser = new Parser({
  customFields: {
    item: [['media:thumbnail', 'image'], ['a10:updated', 'updated']]
  }
});

const parsePublish = ({isoDate, updated}) => {
  if (dateFns.isValid(new Date(updated))) return new Date(updated);
  if (dateFns.isValid(new Date(isoDate))) return new Date(isoDate);

  return null;
};

const {JSDOM} = require('jsdom');

const parseImage = ({image, content, enclosure}, {domain}) => {
  if (image && image.$ && image.$.url) {
    return image.$.url;
  }

  if (enclosure && enclosure.url) {
    return enclosure.url;
  }

  if (content) {
    const dom = new JSDOM(content);
    const imageDoms = dom.window.document.querySelectorAll('img');
    const imageUrls = Array.from(imageDoms).map(i => i.getAttribute('src'));
    const domainImageUrl = imageUrls.find(img => domain.includes(url.parse(img).hostname));
    return domainImageUrl || imageUrls[0];
  }

  return null;
};

const parseDescription = ({contentSnippet, content}) => {
  const description = contentSnippet || content;
  if (typeof description !== 'string') return null;

  const dom = new JSDOM(description);
  const sample = dom.window.document.body.textContent.trim();

  if (sample.length < 15) return null;

  return sample.substring(0, 256);
};

const parseTitle = ({title}) => {
  if (!title) return null;

  const dom = new JSDOM(title);
  const sample = dom.window.document.body.textContent.trim();

  if (sample.length < 6) return null;

  return sample.substring(0, 128);
};

const parseFeed = (feed, registration) => {
  // console.log(feed);
  const {link} = feed;
  return {
    title: parseTitle(feed),
    image: parseImage(feed, registration),
    description: parseDescription(feed),
    published: parsePublish(feed),
    link,
    author: null
  };
};

const crawlString = registration => {
  const file = fs.readFileSync(registration.filepath);
  return parser.parseString(file).then(feed => feed.items.map(item => parseFeed(item, registration)));
};

module.exports = {crawlString};
