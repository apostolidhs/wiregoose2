const path = require('path');
const {fromFile} = require('./index');

const articles = {
  madata: 'madata.htm',
  newsit: 'newsit.htm',
  altsantiri: 'altsantiri.htm',
  cnn: 'cnn.html',
  newsbeast: 'newsbeast.htm',
  in: 'in.html',
  in2: 'in2.html',
  zougla: 'zougla.htm',
  lifo: 'lifo.html',
  lifo2: 'lifo2.htm',
  tvxs: 'tvxs.htm',
  skai: 'skai.htm',
  skai2: 'skai2.htm',
  skai3: 'skai3.htm',
  newsbomb: 'newsbomb.htm'
};

Object.entries(articles).forEach(([name, pathname]) => {
  it(`reads ${name}`, async () => {
    const filepath = path.resolve(__filename, '../../../fixtures/articles/', pathname);
    const content = await fromFile(filepath, {href: 'https://example.com/myArticle'});
    expect(content).toMatchSnapshot();
  });
});
