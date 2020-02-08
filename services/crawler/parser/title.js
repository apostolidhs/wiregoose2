const {clean} = require('./helpers');

module.exports = ({title}) => clean(title, 6, 128);
