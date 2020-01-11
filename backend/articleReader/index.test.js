const path = require('path');
const {fromFile} = require('./index');

const articles = {
  madata: '../../../fixtures/articles/madata.htm',
  newsit: '../../../fixtures/articles/newsit.htm',
  altsantiri: '../../../fixtures/articles/altsantiri.htm',
  cnn: '../../../fixtures/articles/cnn.html',
  newsbeast: '../../../fixtures/articles/newsbeast.htm',
  in: '../../../fixtures/articles/in.html',
  in2: '../../../fixtures/articles/in2.html',
  zougla: '../../../fixtures/articles/zougla.htm',
  lifo: '../../../fixtures/articles/lifo.html'
};

Object.entries(articles).forEach(([name, pathname]) => {
  it(`reads ${name}`, async () => {
    const content = await fromFile(path.resolve(__filename, pathname));
    // console.log(content);
    expect(content).toMatchSnapshot();
  });
});
