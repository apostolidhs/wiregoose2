const guard = require('../../helpers/middlewares/errorGuard');

module.exports = app => {
  app.get(
    '/api/auth/facebook/login',
    guard(async (req, res) => {
      res.json('here');
    })
  );
};
