const {clean} = require('./helpers');

module.exports = ({contentSnippet, content}) => clean(contentSnippet || content, 15, 256);
