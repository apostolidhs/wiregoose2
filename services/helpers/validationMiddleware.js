const {validationResult} = require('express-validator');

const sendJson = (resp, errors) => resp.json({errors: errors.mapped()});

module.exports = ({params, onError = sendJson}) => {
  return (req, res, next) => {
    const errors = validationResult(req).formatWith(e => e.msg);
    if (!errors.isEmpty()) return onError(res.status(422), errors);

    res.locals.params = params(req);
    return next();
  };
};
