module.exports = (func) => async (req, res) => {
  try {
    await func(req, res);
  } catch (e) {
    res.status(500).json({error: e.toString()});
  }
};
