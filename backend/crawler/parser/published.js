const dateFns = require('date-fns');

module.exports = ({isoDate, updated}) => {
  if (dateFns.isValid(new Date(updated))) return new Date(updated);
  if (dateFns.isValid(new Date(isoDate))) return new Date(isoDate);

  return new Date();
};
