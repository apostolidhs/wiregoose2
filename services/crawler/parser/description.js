const {clean} = require('./helpers');

module.exports = ({contentSnippet, content, description}) => clean(contentSnippet || content || description, 15, 256);
