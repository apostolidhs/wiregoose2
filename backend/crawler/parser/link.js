const normalizeUrl = require('normalize-url');
const isValidUrl = require('../../helpers/isValidUrl');

module.exports = ({link}) => (isValidUrl(link) ? normalizeUrl(link) : null);
