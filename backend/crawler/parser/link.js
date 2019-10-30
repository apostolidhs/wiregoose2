const isValidUrl = require('../../helpers/isValidUrl');

module.exports = ({link}) => (isValidUrl(link) ? link : null);
