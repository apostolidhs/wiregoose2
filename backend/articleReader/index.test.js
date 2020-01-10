const path = require('path');
const {fromFile} = require('./index');

const articles = {
  madata: '../../../fixtures/articles/madata.htm',
  newsit: '../../../fixtures/articles/newsit.htm',
  altsantiri: '../../../fixtures/articles/altsantiri.htm'
};

Object.entries(articles).forEach(([name, pathname]) => {
  it(`reads ${name}`, async () => {
    const content = await fromFile(path.resolve(__filename, pathname));
    console.log(content);
    expect(content).toMatchSnapshot();
  });
});
