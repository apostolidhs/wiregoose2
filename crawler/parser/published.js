const dateFns = require('date-fns');

const getDate = () => (process.env.NODE_ENV === 'test' ? new Date(2019, 11, 10) : new Date());

module.exports = ({isoDate, updated}) => {
  if (dateFns.isValid(new Date(updated))) return new Date(updated);
  if (dateFns.isValid(new Date(isoDate))) return new Date(isoDate);

  return getDate();
};
