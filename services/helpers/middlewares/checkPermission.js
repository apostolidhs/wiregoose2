let throttlingId;

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (process.env.AUTHENTICATION_TOKEN === token && !throttlingId) return next();

  if (!throttlingId) {
    throttlingId = setTimeout(() => {
      throttlingId = null;
    }, 4 * 1000);
  }

  res.status(401).json({message: 'Invalide Credentials'});
};
