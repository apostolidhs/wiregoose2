const {clean} = require('./helpers');

module.exports = ({creator, author}) => clean(creator || author, 2, 128);
